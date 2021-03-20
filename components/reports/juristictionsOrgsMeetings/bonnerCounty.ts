export const politicians = ["Steve_Bradshaw", "Jeff_Connolly", "Dan_McDonald"];

export const meeting = {
  value: {
    isMeeting: true,
    politicians: politicians,
  },
  label: "meeting",
};

export const BonnerCounty = {
  isJuristiction: true,
  organizations: [
    {
      value: {
        isOrganization: true,
        meetings: [meeting],
      },
      label: "Board_of_Commissioners",
    },
  ],
};

export default BonnerCounty;
