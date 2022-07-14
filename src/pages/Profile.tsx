import { User as UserIcon } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/form/Input";
import { Header } from "../components/Header";
import { editUser, getUser, setUser, User } from "../features/userSlice";

type stateOptions =
  | "name"
  | "photo"
  | "gainPerMonth"
  | "weeksFreePerYear"
  | "workDaysPerWeek"
  | "workHoursPerDay"
  | "priceHour";

export type UserInfo = {
  name: string;
  photo: string;
  gainPerMonth: string;
  weeksFreePerYear: string;
  workDaysPerWeek: string;
  workHoursPerDay: string;
  priceHour: string;
};

export function Profile() {
  const [userImage, setUserImage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    photo: "",
    gainPerMonth: "",
    weeksFreePerYear: "",
    workDaysPerWeek: "",
    workHoursPerDay: "",
    priceHour: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const onChangeValueState = (
    e: ChangeEvent<HTMLInputElement>,
    keyState: stateOptions
  ) => {
    setUserInfo((oldUserInfo) => ({
      ...oldUserInfo,
      [keyState]: e.target.value,
    }));
  };

  const canSubmit = [
    userInfo.gainPerMonth,
    userInfo.weeksFreePerYear,
    userInfo.workDaysPerWeek,
    userInfo.workHoursPerDay,
  ].every(Boolean);

  const pricePerHour =
    Number(userInfo.gainPerMonth) /
    (Number(userInfo.workHoursPerDay) * Number(userInfo.workDaysPerWeek));

  const handleSaveData = () => {
    if (canSubmit) {
      if (!user.id) {
        const user: UserInfo = {
          ...userInfo,
          priceHour: String(pricePerHour),
        };

        dispatch(setUser(user));
      } else {
        const ediUser: User = {
          id: user.id,
          name: userInfo.name,
          photo: userInfo.photo,
          gainPerMonth: Number(userInfo.gainPerMonth),
          weeksFreePerYear: Number(userInfo.weeksFreePerYear),
          workDaysPerWeek: Number(userInfo.workDaysPerWeek),
          workHoursPerDay: Number(userInfo.workHoursPerDay),
          priceHour: Number(pricePerHour),
        };
        dispatch(editUser(ediUser));
      }

      navigate("/");
    }
  };

  useEffect(() => {
    if (user.id) {
      setUserInfo({
        name: user.name,
        photo: user.photo,
        weeksFreePerYear: String(user.weeksFreePerYear),
        workDaysPerWeek: String(user.workDaysPerWeek),
        workHoursPerDay: String(user.workHoursPerDay),
        gainPerMonth: String(user.gainPerMonth),
        priceHour: String(user.priceHour),
      });

      setUserImage(user.photo);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Header title="Meu perfil" backRoute="/" />

      <div className="max-w-[1120px] w-full flex mt-16 gap-32">
        <div className="w-[352px] h-[556px] flex flex-col items-center justify-center bg-white border border-[#E1E3E5] rounded">
          <div className="flex flex-col gap-6 items-center">
            {userImage ? (
              <img
                className="w-44 h-44 rounded-full ring-4 ring-[#F1972C]"
                src={userImage}
                alt="user photo"
              />
            ) : (
              <UserIcon
                className="w-44 h-44 rounded-full ring-4 ring-[#F1972C] ring-offset-4"
                color="#5A5A66"
              />
            )}
            <p className="text-[28px] font-semibold text-[#5A5A66]">
              {user.name ? user.name : "default"}
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <p className="text-xl text-[#5A5A66] w-52 text-center">
              O valor da sua hora é{" "}
              <span className="font-semibold">
                {isFinite(pricePerHour)
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(pricePerHour)
                  : new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(0)}{" "}
                reais
              </span>
            </p>

            {canSubmit ? (
              <button
                onClick={handleSaveData}
                className="mt-6 uppercase font-semibold text-white rounded py-3 px-12 bg-[#36B236] hover:bg-[#3CC73C]"
              >
                salvar dados
              </button>
            ) : (
              <button
                disabled
                className="mt-6 uppercase font-semibold text-white rounded py-3 px-12 bg-gray-400"
              >
                salvar dados
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full">
            <div className="pb-4 border-b-2 border-b-[#E1E3E5]">
              <h3 className="text-4xl text-[#5A5A66] font-semibold">
                Dados do perfil
              </h3>
            </div>
            <div className="pt-8 flex gap-6">
              <Input
                id="Name"
                placeholder="Nome"
                full
                value={userInfo.name}
                onChange={(e) => onChangeValueState(e, "name")}
              />
              <Input
                id="Photo"
                placeholder="Link da foto"
                value={userInfo.photo}
                onChange={(e) => onChangeValueState(e, "photo")}
              />
            </div>
          </div>

          <div className="w-full mt-14">
            <div className="pb-4 border-b-2 border-b-[#E1E3E5]">
              <h3 className="text-4xl text-[#5A5A66] font-semibold">
                Planejamento
              </h3>
            </div>
            <div className="pt-8 flex gap-6">
              <Input
                id="gain_per_month"
                value={userInfo.gainPerMonth}
                onChange={(e) => onChangeValueState(e, "gainPerMonth")}
                placeholder="R$"
                label={`Quanto eu \n quero ganhar por mês?`}
              />
              <Input
                id="hours_per_day"
                value={userInfo.workHoursPerDay}
                onChange={(e) => onChangeValueState(e, "workHoursPerDay")}
                label={`Quantas horas \n quero trabalhar por dia?`}
              />
            </div>
            <div className="pt-6 flex gap-6">
              <Input
                id="days_for_week"
                value={userInfo.workDaysPerWeek}
                onChange={(e) => onChangeValueState(e, "workDaysPerWeek")}
                label={`Quantos dias quero \n trabalhar por semana?`}
              />
              <Input
                id="weeks_free"
                value={userInfo.weeksFreePerYear}
                onChange={(e) => onChangeValueState(e, "weeksFreePerYear")}
                label={`Quantas semanas \n por ano você quer tirar férias?`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
