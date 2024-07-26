import { FC } from "react";
import { Button, Row } from "antd";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { ROUTES } from "../../routes";
import { authLogout } from "../../store/userSlice/userSLice.ts";

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const handleClick = () => {
    dispatch(authLogout());
    navigate(ROUTES.auth);
  };

  return (
    <header
      style={{
        padding: "16px 32px",
        borderBottom: "1px solid #E7E7E7",
        height: "68px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Row>
        Hello {user?.firstName ?? ""} {user?.surname ?? ""}!
      </Row>
      <Row>
        <Button htmlType={"button"} onClick={handleClick} type={"primary"}>
          Log out
        </Button>
      </Row>
    </header>
  );
};
