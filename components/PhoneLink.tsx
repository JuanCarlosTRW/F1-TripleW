import type { ComponentPropsWithoutRef } from "react";
import { trackPhoneClick } from "@/components/utils/trackPhoneClick";

const TEL = "tel:9729656901";

type PhoneLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href?: typeof TEL;
};

export default function PhoneLink({ onClick, href = TEL, ...props }: PhoneLinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        trackPhoneClick();
        onClick?.(e);
      }}
    />
  );
}
