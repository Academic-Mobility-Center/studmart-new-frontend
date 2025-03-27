import InputField from "@/components/fields/input/InputField";
import PasswordField from "@/components/fields/password/PasswordField";

export default function RegForm1(){
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">1/3</h2>
            </div>

            <InputField label="Почта" placeholder="Example@gmail.com"/>
            <PasswordField label="Пароль" placeholder="********"/>
            <PasswordField label="Повторите пароль" placeholder="********"/>
            <InputField label="Есть промокод?" placeholder="Hhufs8a7auh40egij"/>
    
            <div className="flex flex-col gap-4">
                <button className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl">Далее</button>
                <p className="text-sm font-bold text-[#032c28] text-center">
                    Уже есть аккаунт? <span className="text-[#6dbc29] underline">Войти</span>
                </p>
            </div>    
        </>
    )
}