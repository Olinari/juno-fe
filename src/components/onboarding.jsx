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
        <>
          <>Juno is keeping you safe!</>
          <div style={{ marginTop: "32px" }}>
            <svg
              width="91"
              height="118"
              viewBox="0 0 91 118"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_210_22)">
                <path
                  d="M89.3 26.34C89.3 25.13 88.99 24.38 87.81 23.78C83.51 21.6 79.28 19.28 75.03 16.99C65.59 11.89 56.14 6.78 46.72 1.65C45.23 0.84 43.94 0.74 42.37 1.65C37.21 4.64 31.96 7.47 26.74 10.36C18.68 14.83 10.64 19.34 2.53001 23.73C1.29001 24.41 1.00001 25.18 1.01001 26.43C1.05001 32.23 1.02001 38.04 1.02001 43.85V47.63C1.03001 55.89 0.520014 64.21 3.10001 72.22C4.60001 76.87 6.20001 81.55 8.38001 85.9C12.62 94.34 18.72 101.34 26.26 107.04C31.14 110.73 36.51 113.55 42.14 115.87C43.05 116.25 44.26 116.83 45 116.52C48.88 114.87 52.74 113.12 56.46 111.13C68.51 104.69 76.41 95.09 83.16 82.73C87.19 74.31 89.18 65.32 89.26 55.94C89.29 51.61 89.27 47.29 89.27 42.96C89.27 37.43 89.25 31.89 89.29 26.37L89.3 26.34ZM60.65 71.05C55.77 77.4 49.68 80.96 45.07 82.93C40.83 81.61 33.44 78.54 27.81 71.35C24.85 67.57 20.99 62.66 22.21 56.58C23.17 51.81 27.24 46.1 33.47 45.67C39.91 45.23 44.09 50.74 44.41 51.17C49.57 45.85 56.32 44.21 60.82 46.7C65.84 49.48 66.25 56.4 66.29 57.6C66.51 63.38 63.34 67.55 60.65 71.06V71.05Z"
                  fill="#F0B999"
                  stroke="#121541"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
              </g>
              <defs>
                <clipPath id="clip0_210_22">
                  <rect width="90.3" height="117.59" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </>
      ) : (
        <Multiselect options={groups.data} displayValue="name" />
      )}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  margin-top: 30px;
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
