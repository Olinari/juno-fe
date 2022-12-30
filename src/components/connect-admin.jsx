import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getAdminQr, secureConnection } from "../services/whatsapp";
import { Multiselect } from "multiselect-react-dropdown";
import Page from "./page";

const ConnectAdmin = () => {
  return (
    <Page>
      <ConnectToWhatsapp />
    </Page>
  );
};

const ConnectToWhatsapp = ({ stageData, nextStage }) => {
  const { data: qrData, isLoading } = useQuery(
    "qrdata",
    async () => await getAdminQr()
  );
  const [connectionSuccess, setSuccess] = useState(false);
  console.log(qrData);
  const verifyConneciton = async () => {
    try {
      const data = await secureConnection(stageData.parentPhone);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (qrData?.qr) {
      const intervalId = setInterval(() => {
        verifyConneciton().then((data) => {
          console.log(data);
          if (data?.connected) {
            clearInterval(intervalId);
            setSuccess(true);
          }
        });
      }, 700);
    }
  }, [qrData, isLoading]);

  return (
    <ContentContainer>
      {connectionSuccess ? (
        "Success!"
      ) : (
        <>
          {isLoading ? (
            "loading..."
          ) : (
            <>
              <Description>👁</Description>
              <Qr>{qrData.qr}</Qr>
            </>
          )}
        </>
      )}
    </ContentContainer>
  );
};

const Rules = ({ stageData, nextStage }) => {
  /*   const { data: groups, isLoading } = useQuery(
    "groups",
    async () => await getGroupsData(stageData.parentPhone)
  ); */

  return (
    <ContentContainer>
      {true ? (
        "Loading groups, this can take a while..."
      ) : (
        <Multiselect options={groups.data} displayValue="name" />
      )}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  white-space: pre-wrap;
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Qr = styled.div`
  margin-top: 24px;
  font-size: 10px;
  transform: scaleY(1.2);
`;

const Description = styled.p`
  padding: 28px;
`;

const ParentDetailsForm = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    padding: 4px;
    margin: 4px;
    background-color: transparent;

    &:focus {
      text-decoration: underline 2px solid var(--purple);
      text-underline-offset: 2px;
      transition: text-decoration 0.2s;
    }
  }

  button {
    padding: 4px 8px;
    color: white;
    background-color: var(--purple);
  }
`;

export default ConnectAdmin;
