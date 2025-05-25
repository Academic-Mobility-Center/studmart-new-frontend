"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {getStudentById} from "@/lib/api/students"
import IStudentFormData from "@/app/student-personal-account/context"
import {useAuth} from "@/context/AuthContext"
const StudId: React.FC = () => {
    const [image, setImage] = useState("/icons/student-account/d4eeae509bbfb902288411fb819999c2.jpeg");
    const [isLoading, setIsLoading] = useState(false);
    const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null)
    const {id} = useAuth();
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setIsLoading(false); 
            };
            reader.readAsDataURL(file);
        }
    };    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const student = await getStudentById(id ?? "");
                if (student) {
                    setFetchStudent(student);
                }
            } catch (e:unknown ) {
                const error = e as { response?: { status: number } };
                if (error?.response?.status === 400) {
                    console.warn("Ошибка 400 при загрузке студентов:", e);
                } else {
                    console.error("Ошибка при загрузке студентов:", e);
                }
            }
        }
        if (id){
            fetchData();
        }
    },[id])
    const date = new Date();
    const year = date.getFullYear() + (fetchStudent?.course?.yearsBeforeEnding && fetchStudent?.course?.yearsBeforeEnding > 0 ? fetchStudent?.course?.yearsBeforeEnding : 0)
    const userData = {
        firstName: fetchStudent?.firstName,
        lastName: fetchStudent?.lastName,
        university: {
            shortName: fetchStudent?.university?.shortName
        },
        course: {
            name: fetchStudent?.course?.name,
            yearsBeforeEnding: year
        }
    };

    return (
        <>
            <div
                className="border bg-[#f0e9e2] box-border grow-0 shrink-0 basis-auto pt-10 px-2.5 pb-12 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px] relative"
            >
                <Image
                    src="/icons/student-account/lines.png"
                    className="absolute top-0 right-0 h-[57px] w-[186px] rotate-180 right-[-48px]"
                    alt="lines" width={186} height={57}
                />
                <div className="flex justify-start items-start flex-row px-[30px] relative z-100">
                    <div
                        className="border w-[200px] box-border 
                        flex justify-start items-stretch flex-col 
                        grow-0 shrink-0 basis-auto pl-[140px] pr-2.5 
                        pt-[150px] rounded-[360px] 
                        border-solid border-[rgba(0,0,0,0.20)]"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <label htmlFor="image-upload" className="border bg-[#f8f8f8] box-border flex justify-center items-center flex-col 
                        h-[50px] grow-0 shrink-0 basis-auto rounded-[360px] border-solid border-[rgba(0,0,0,0.20)] cursor-pointer">
                            <Image
                                alt='' src="/icons/student-account/camera.svg" className="w-6 h-6 flex grow-0 shrink-0 basis-auto" width={24} height={24}/>
                            {isLoading && <div className="animate-spin h-6 w-6 border-t-2 border-solid border-[#888888] rounded-full mt-2"></div>}
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="w-[171px] grow-0 shrink-0 basis-auto box-border ml-10 pb-[26px] gap-[15px] flex flex-col">
                        <div className="flex-column">
                            <p className="text-[#888888]">Имя и фамилия</p>
                            <p className="text-[#032C28] text-xl font-bold">{userData.firstName} {userData.lastName}</p>
                        </div>
                        <div className="flex-column">
                            <p className="text-[#888888]">Университет</p>
                            <p className="text-[#032C28] text-xl font-bold">{userData.university.shortName}</p>
                        </div>
                        <div className="flex-column">
                            <p className="text-[#888888]">Год окончания</p>
                            <p className="text-[#032C28] text-xl font-bold">{userData?.course?.yearsBeforeEnding}</p>
                        </div>
                    </div>
                </div>  
                <div className="relative">
                    <Link href="profile" className="absolute inset-0 flex justify-between items-center px-4 z-10">
                        <div className="flex-grow">
                            <Image
                                alt='' 
                                src="/icons/student-account/lines.png" 
                                className="h-[95px] max-w-[initial] w-[310px] 
                                box-border block border-[none] transform scale-x-[-1]" 
                                height={95}  width={310}                          />
                        </div>
                        <div className="box-border flex justify-start items-center flex-row gap-2.5">
                            <Image 
                                alt=''
                                src="/icons/student-account/edit-square.svg" width={32} height={32} className="w-6 h-6 flex grow-0 shrink-0 basis-auto box-border" />
                            <p className="[font-family:Mulish,sans-serif] text-sm font-normal text-[#888888] grow-0 shrink-0 basis-auto m-0 p-0">Редактировать</p>
                        </div>
                    </Link>
                </div>                            
            </div>
        </>
    );
};

export default StudId;


