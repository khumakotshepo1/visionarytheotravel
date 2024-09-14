import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { VerifyEmailBadge } from "./verify-email-badge";

type SettingsCard = {
  title: string;
  content: string;
  action: React.ReactNode;
  verified?: boolean;
  token?: string;
  email?: string;
};

export const SettingsCard = ({
  title,
  content,
  action,
  token,
  verified,
  email,
}: SettingsCard) => {
  return (
    <Card className="bg-white bg-orangeElement dark:bg-orangeElement">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {title === "Profile Picture" ? (
          content === null ? (
            <Avatar className="w-20 h-20">
              <AvatarFallback>
                <CircleUserRound />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Image src={content} alt={title} width={80} height={80} />
          )
        ) : (
          <p
            className={`${
              title === "Email Address" ? "lowercase" : "capitalize"
            } p-3 bg-background rounded-xl`}
          >
            {content}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <>{action}</>
        {title === "Email Address" && verified && (
          <Badge variant="outline" className="border-green-400 font-bold">
            Verified
          </Badge>
        )}
        {title === "Email Address" && !verified && (
          <VerifyEmailBadge token={token} email={email} />
        )}
      </CardFooter>
    </Card>
  );
};
