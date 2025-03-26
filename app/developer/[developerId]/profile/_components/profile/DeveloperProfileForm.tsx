/**
 * DeveloperProfileForm - Comprehensive form for updating developer profile details
 * Includes sections for personal info, profile image, mission, and greeting
 */
import React from "react";
import { DeveloperProfileFormProps } from "@/app/developer/[developerId]/profile/_components/profile/types";
import { ClientFormWrapperDeveloperProfile } from "@/app/developer/[developerId]/profile/_components/profile/ClientFormWrapperDeveloperProfile";
import { UncontrolledTextAreaInput } from "@/components/ui/forms/text-area/UncontrolledTextAreaInput";
import { SingleImageUpload } from "@/components/ui/forms/single-image-upload/SingleImageUpload";
import { FormSection } from "@/components/ui/forms/section/FormSection";
import { UncontrolledInputField } from "@/components/ui/forms/input/UncontrolledInputField";

export const DeveloperProfileForm: React.FC<DeveloperProfileFormProps> = ({
  developer,
}: DeveloperProfileFormProps) => {
  return (
    // Centered container with responsive width
    <div className="w-full md:w-4/5 mx-auto pt-10">
      {/* Wrap form with client-side form submission handler */}
      <ClientFormWrapperDeveloperProfile developer={developer}>
        {/* General Information Section */}
        <FormSection
          title={"General Information:"}
          subTitle={"Tell us about yourself"}
          className="mb-10"
        >
          {/* Personal details input fields */}
          <UncontrolledInputField
            id="name"
            label="Name"
            type="text"
            defaultValue={developer.name}
            className="mb-5"
          />
          <UncontrolledInputField
            id="email"
            label="Email"
            type="email"
            defaultValue={developer.email}
            className="mb-5"
          />
          <UncontrolledInputField
            id="itExperienceStartDate"
            label="Start date IT experience"
            type="date"
            defaultValue={developer.itExperienceStartDate}
            className="mb-5"
          />
          <UncontrolledInputField
            id="workExperienceStartDate"
            label="Start date Work experience"
            type="date"
            defaultValue={developer.workExperienceStartDate}
          />
        </FormSection>

        {/* Profile Image Upload Section */}
        <FormSection
          title="Image selection"
          subTitle="Upload an image about you in the png format"
          className="mb-5"
        >
          <SingleImageUpload
            label={"Profile image"}
            className={"mt-5 h-64"}
            // Dynamic upload directory based on developer ID
            directory={`developers/${developer.id}/profile/`}
          ></SingleImageUpload>
        </FormSection>

        {/* Mission Section */}
        <FormSection
          title={"Mission:"}
          subTitle={"What is your mission? Describe it here"}
          className="mb-5"
        >
          <UncontrolledInputField
            id="missionTitle"
            label="Mission title"
            type="text"
            defaultValue={developer.mission.title}
            className="mb-5"
          />
          <UncontrolledTextAreaInput
            id={"missionDescription"}
            label={"Mission description"}
            rows={3}
            defaultValue={developer.mission.description}
          />
        </FormSection>

        {/* Greeting Section */}
        <FormSection
          title={"Greeting:"}
          subTitle={
            "The greeting message you want to show at the top of your resume"
          }
          className="mb-5"
        >
          <UncontrolledInputField
            id="greetingTitle"
            label="Greeting title"
            type="text"
            defaultValue={developer.greeting.title}
            className="mb-5"
          />
          <UncontrolledTextAreaInput
            id={"greetingMessage"}
            label={"Greeting message"}
            rows={3}
            defaultValue={developer.greeting.message}
          />
        </FormSection>
      </ClientFormWrapperDeveloperProfile>
    </div>
  );
};
