import clsx from "clsx";

type Props = {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
};

type Options = {
  full?: boolean;
};

export const formatFio = <T extends Props>(entity: T, options?: Options) => {
  const firstName = entity.firstName;
  const lastName = entity.lastName;
  const middleName = entity.middleName;

  if (options?.full) {
    return clsx(lastName, firstName, middleName);
  }

  return clsx(
    lastName && lastName,
    firstName && `${firstName[0]}.`,
    middleName && `${middleName[0]}.`,
  );
};
