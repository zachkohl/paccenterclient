export type juristiction = {
  value: {
    isJuristiction: boolean;
    organizations: [organization] | [];
  };
  label: string;
};

export type organization = {
  value: {
    isOrganization: boolean;
    meetings: [meeting] | [];
  };
  label: string;
};

export type meeting = {
  value: {
    isMeeting: boolean;
    politicians: [string] | [];
  };
  label: "";
};

const Sandpoint = {
  isJuristiction: true,
  organizations: [
    {
      value: {
        isOrganization: true,
        meetings: [
          {
            value: {
              isMeeting: true,
              politicians: [
                "Shannon_Sherman",
                "Deb_Ruehle",
                "Joel_Aispuro",
                "John_Darling",
                "Kate_McAlister",
                "Andy_Groat",
              ],
            },
            label: "meeting",
          },
        ],
      },
      label: "City_Council",
    },
  ],
};
