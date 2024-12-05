"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { EyeOpen, EyeClosed } from "@/app/icons";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  isInvalid: boolean;
  errorMessage?: string;
  isRequired?: boolean;
}

export function PasswordInput({
  name,
  label,
  placeholder,
  isInvalid,
  errorMessage,
  isRequired,
}: PasswordInputProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Input
      label={label}
      name={name}
      placeholder={placeholder}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      isRequired={isRequired}
      variant="bordered"
      type={isVisible ? "text" : "password"}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? <EyeClosed /> : <EyeOpen />}
        </button>
      }
    />
  );
}
