import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getQr, secureConnection } from "../services/whatsapp";
import { useForm } from "react-hook-form";
import Page from "./page";

const Onboarding = () => {
  const [stage, setStage] = useState(0);
  const [stageData, setStageData] = useState(null);

  const nextStage = (data) => {
    setStage(() => stage + 1);
    setStageData(data);
  };
  const prevStage = () => {
    setStage(() => stage - 1);
    setStageData(data);
  };

  return (
    <Page>
      <OnboardingFlow
        stage={stage}
        stageData={stageData}
        prevStage={prevStage}
        nextStage={nextStage}
      />
    </Page>
  );
};

const OnboardingFlow = ({ stage, ...props }) => {
  switch (stage) {
    case 0:
      return <ParentForm {...props} />;
    case 1:
      return <ConnectToWhatsapp {...props} />;
  }
};

const ParentForm = ({ nextStage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => nextStage(data);

  return (
    <>
      <Description>
        Please provide **your** whatsapp phone number so we can inform you in
        the case of text blah.
      </Description>
      <ParentDetailsForm onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Your Phone # here"
          {...register("parentPhone", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </ParentDetailsForm>
    </>
  );
};

const ConnectToWhatsapp = ({ stageData }) => {
  const { data: qrData, isLoading } = useQuery(
    "qrdata",
    async () => await getQr(stageData.parentPhone)
  );
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

export default Onboarding;
