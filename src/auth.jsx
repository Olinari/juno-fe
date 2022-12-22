import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getQr, secureConnection } from "./services/whatsapp";

export const authenticateUser = (data) => {
  console.log(localStorage);
};

export const Auth = () => {
  const { data: qrData, isLoading, ...data } = useQuery("qrdata", getQr);
  const [success, setSuccess] = useState(false);

  const verifyConneciton = async () => {
    try {
      const data = await secureConnection();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (qrData?.qr) {
      const intervalId = setInterval(() => {
        verifyConneciton().then((data) => {
          if (data?.connected) {
            clearInterval(intervalId);
            setSuccess(true);
          }
        });
      }, 700);
    }
  }, [qrData, isLoading]);

  return (
    <QrContainer>
      {success ? (
        "Success!"
      ) : (
        <>
          {isLoading ? (
            "loading..."
          ) : (
            <>
              <Description>
                Scan This Qr code using whatsapp (Link a device) on the device
                you would like to protect 👁
              </Description>
              <Qr>{qrData.qr}</Qr>
            </>
          )}
        </>
      )}
    </QrContainer>
  );
};

const QrContainer = styled.div`
  font-family: monospace;
  background-color: var(--pink);
  color: var(--purple);
  white-space: pre-wrap;
  height: 100vh;
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
