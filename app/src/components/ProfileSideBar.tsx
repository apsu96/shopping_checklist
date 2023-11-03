import { styled } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "./UIKit.styled";

export const ProfileSidebarContainer = styled.div`
  text-align: center;
  width: 80px;
  background: rgba(108, 136, 111, 0.18);
  padding-top: 50px;
`;

const ProfileSideBar = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ProfileSidebarContainer>
      <IconButton onClick={() => setIsOpen(true)}>
        <MenuIcon
          sx={{ color: "rgba(198, 153, 37, 1)", width: "40px", height: "30px" }}
        />
      </IconButton>
    </ProfileSidebarContainer>
  );
};

export default ProfileSideBar;
