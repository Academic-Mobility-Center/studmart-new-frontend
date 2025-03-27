import { FileField } from "@/components/fields/file/FileField";
import InputField from "@/components/fields/input/InputField";
import { SelectField } from "@/components/fields/select/SelectField";


export default function RegForm3(){
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">3/3</h2>
            </div>
            <SelectField label="Университет" options={["НГУ", "НГТУ", "МГУ"]}/>
            <InputField label="Специальность" placeholder="Специальность"/>
            <SelectField label="Курс" options={["Первый", "Второй", "Третий"]}/>
            <FileField label="Документ, подтверждающий статус студента" />
            
            <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-[15px]">
                    <button className="bg-[#EFEFEF] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[116px] w-[116px] h-[48]">Назад</button>
                    <button className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[219px] w-[219px]">Далее</button>
                </div>
                <p className="text-sm font-bold text-[#032c28] text-center">
                    Уже есть аккаунт? <span className="text-[#6dbc29] underline">Войти</span>
                </p>
            </div>    
        </>
    )
}