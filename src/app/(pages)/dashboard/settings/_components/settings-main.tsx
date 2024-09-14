import { auth } from "@/auth";
import { SettingsCard } from "./settings-card";
import { ChangeImage } from "./change-image";
import { ChangeFullName } from "./change-full-name";
import { ChangeEmail } from "./change-email";
import { ChangePhone } from "./change-phone";
import { getVerificationTokenByEmail } from "@/server/users.server";

export const SettingsMain = async () => {
  const session = await auth();

  const firstName = session?.user?.first_name as string;
  const lastName = session?.user?.last_name as string;

  const name = `${firstName} ${lastName}`;

  const email = session?.user?.email as string;

  const verificationToken = await getVerificationTokenByEmail(email);
  const token = verificationToken?.token;

  return (
    <>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4">
        <>
          <SettingsCard
            title="Full Name"
            content={name}
            action={<ChangeFullName />}
          />
          <SettingsCard
            title="Email Address"
            content={email}
            action={<ChangeEmail />}
            verified={session?.user?.email_verified}
            token={token}
            email={email}
          />

          <SettingsCard
            title="Phone Number"
            content={
              !session?.user?.phone ? "no phone number" : session?.user?.phone
            }
            action={<ChangePhone />}
          />

          <SettingsCard
            title="Password"
            content="Reset Password"
            action="reset"
          />
          <SettingsCard
            title="Profile Picture"
            content={session?.user?.image as string}
            action={<ChangeImage session={session} />}
          />
        </>
      </div>
    </>
  );
};
