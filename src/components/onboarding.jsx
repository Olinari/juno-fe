import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getQr, secureConnection, getGroupsData } from "../services/whatsapp";
import { useForm } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";
import Page from "./page";
import { TextField } from "@mui/material";

const Onboarding = () => {
  const [stage, setStage] = useState(0);
  const [stageData, setStageData] = useState(null);

  const nextStage = (data) => {
    setStage(() => stage + 1);
    setStageData(data);
  };
  const prevStage = (data) => {
    setStage(() => stage - 1);
    setStageData(data);
  };

  return (
    <OnboardingPage>
      <OnboardingFlow
        stage={stage}
        stageData={stageData}
        prevStage={prevStage}
        nextStage={nextStage}
      />
    </OnboardingPage>
  );
};

const OnboardingFlow = ({ stage, ...props }) => {
  switch (stage) {
    case 0:
      return <ParentForm {...props} />;
    case 1:
      return <ConnectToWhatsapp {...props} />;
    case 2:
      return <Rules {...props} />;
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
        Please provide some details, so we can inform you in the case of
        toxic/violent messages.
      </Description>
      <ParentDetailsForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          variant="standard"
          label="Child's Name"
          {...register("childName", { required: false })}
        />

        <TextField
          style={{ marginTop: "32px" }}
          required
          variant="standard"
          label="Your Phone # here"
          {...register("parentPhone", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </ParentDetailsForm>
    </>
  );
};

const ConnectToWhatsapp = ({ stageData, nextStage }) => {
  console.log(stageData);
  const { data: qrData, isLoading } = useQuery(
    "qrdata",
    async () => await getQr(stageData.parentPhone, stageData.childName ?? "")
  );
  const [connectionSuccess, setSuccess] = useState(false);

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

  useEffect(() => {
    if (connectionSuccess) {
      nextStage(stageData);
    }
  }, [connectionSuccess]);

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
              <Description>
                Scan This Qr code using whatsapp (Link a device) on the device
                you would like to protect 👁
              </Description>
              <Qr>{qrData?.qr}</Qr>
            </>
          )}
        </>
      )}
    </ContentContainer>
  );
};

const Rules = () => {
  return (
    <ContentContainer>
      {true ? (
        "Juno is keeping you safe!"
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
  font-family: monospace;
`;

const Description = styled.p`
  padding: 28px;
`;

const ParentDetailsForm = styled.form`
  font-family: sans-serif !important;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 32px;
    padding: 8px 16px;
    color: white;
    border-radius: 100vmax;
    background-color: var(--dark);
  }
`;

const OnboardingPage = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Onboarding;
