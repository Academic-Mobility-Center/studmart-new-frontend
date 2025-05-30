"use client";
import fileToBase64 from "@/app/home/context";
import { profileCardClasses, profileTitleClasses } from "@/app/partner-personal-account/context";
import InputField from "@/components/fields/input/InputField";
import { Button } from "@mui/base";
import ImageUploader from "@/utils/imageUpload";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPartnerInfo, sendPartnerDescription, sendDescriptionFile } from "@/lib/api/partners";
import { PartnerProfileData } from "@/app/partner-personal-account/context";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";

const pClass = "font-[Mulish] text-[#032C28] mb-[10px]";

interface FormData {
  description: string;
  file: File | null;
}

const PartnerOffersForm: React.FC = () => {
  const { role, id, isLoading } = useAuth();
  const router = useRouter();
  const [fetchPartner, setFetchPartner] = useState<PartnerProfileData | null>(null);
  const [formData, setFormData] = useState<FormData>({ description: "", file: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const saveButton = `font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-5 rounded-[15px] border-[none]`;

  useEffect(() => {
    if (role && role !== "Employee") {
      router.replace("/student-personal-account");
    }
  }, [role, router]);

  const image = `https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partner = await getPartnerInfo(id ?? "");
        setFetchPartner(partner);
        setFormData((prev) => ({
          ...prev,
          description: partner.partner.description || "",
        }));
      } catch (error) {
        console.warn(error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(""); // Сброс ошибки при вводе
  };

  const handleFileSelect = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const validateForm = (): string | null => {
    const { description } = formData;

    if (description.length < 200 || description.length > 1200) {
      return "Описание должно содержать от 200 до 1200 символов.";
    }

    if (/[`]|<script>|<\/script>|<[^>]+>/i.test(description)) {
      return "Описание не должно содержать обратных кавычек (`) и блоков кода.";
    }

    return null;
  };
  const handleSubmit = async () => {  
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
  
    setIsSubmitting(true);
    setErrorMessage("");
  
    try {
      const response = await sendPartnerDescription(formData.description, id ?? "");
      if (!response?.id) {
        console.error("ID отсутствует в ответе");
        return;
      }
  
      if (formData.file) {
        const base64String = await fileToBase64(formData.file);
        const contentType = formData.file.type;
  
        const finalResponse = await sendDescriptionFile(response?.id, base64String, contentType);
  
        if (finalResponse === 201) {
          setIsSubmitted(true);
        }
      } else {
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Ошибка при отправке. Попробуйте снова.");
    } 
  };
  if (!fetchPartner || isLoading) {
    return <>Загрузка...</>;
  }

  return (<>
      <div className={profileCardClasses} style={{ gap: "20px" }}>
      <h3 className={profileTitleClasses}>Профиль партнера</h3>

      <div>
        <p className={pClass}>Фотография компании</p>
        <ImageUploader
          defaultImage={image}
          width={547}
          height={244}
          blurDefault={false}
          containerClassName="mx-auto border-2 border-gray-200"
          onFileSelect={handleFileSelect}
        />
      </div>

      <InputField
        label="Описание компании"
        placeholder="Описание компании"
        name="description"
        value={formData.description}
        onChange={handleDescriptionChange}
        width={547}
        minRows={6}
        maxRows={12}
      />

      {errorMessage && (
        <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        className={saveButton}
        style={{backgroundColor: (isSubmitting || isSubmitted) ? "#efefef" : "#8fe248"}}
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitted || isSubmitting ? "Отправлено" : "Отправить на модерацию"} 
      </Button>
    </div>
    <Dialog open={isSubmitting || isSubmitted} onClose={() => {}} disableEscapeKeyDown>
  <DialogTitle>Успешно отправлено</DialogTitle>
  <DialogContent>
    <Typography>
      Заявка на корректировку предложения успешно направлена. Вы не можете редактировать данные до обновления страницы.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => {
        window.location.reload();
      }}
      className="bg-[#8fe248] text-[#032c28] rounded-[10px] px-4 py-2 font-bold"
    >
      Обновить страницу
    </Button>
  </DialogActions>
</Dialog>

  </>

    
  );
};

export default PartnerOffersForm;
