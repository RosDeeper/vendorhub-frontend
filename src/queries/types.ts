export type DefaultParams = {
  page?: number;
};

export type StaffResponse = {
  id: string;
  avatar_url: string;
  fullName: string;
  services: string[];
  phoneNumber: string;
  workingHour: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
  updatedAt: string;
  timezone: string;
};

export type StaffListResponse = {
  getStaffList: {
    items: StaffResponse[];
    total: number;
  };
};
