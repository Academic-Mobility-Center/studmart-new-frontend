import { Input } from "@mui/base"
import LinkedMenuItem from "../linked-menu-tem/MenuItem";

const Navigation = () => {
    return (
        <div className="box-border flex justify-start items-start flex-col gap-5 w-[140px] grow-0 shrink-0 basis-auto ml-[166px]">
        <p className="[font-family:Mulish,sans-serif] text-base font-bold text-left text-[#032c28] self-stretch grow-0 shrink-0 basis-auto m-0 p-0">
            Навигация
        </p>
        <div className="box-border flex justify-start items-start flex-col gap-2.5 self-stretch grow-0 shrink-0 basis-auto">
            <LinkedMenuItem link="/home" name="Главная страница"/>
            <LinkedMenuItem link="/about" name="О сервисе"/>
            <LinkedMenuItem link="/home" name="Партнерам"/>
            <LinkedMenuItem link="/auth" name="Вход"/>
        </div>
    </div>
    )
}

export default Navigation;