const mockBackendData = async () => {
  return {
    totalSaved: 23000,
    groups: [
      {
        id: 1,
        title: "Family Vacation Fund",
        description: "Saving for our annual family trip to Hawaii",
        saved: 8500,
        goal: 15000,
        members: 6,
        dueDate: "Jun 15",
        status: "Active",
      },
      {
        id: 2,
        title: "Wedding Savings",
        description: "Contribution towards Sarah’s wedding",
        saved: 7000,
        goal: 10000,
        members: 5,
        dueDate: "Aug 30",
        status: "Active",
      },
      {
        id: 3,
        title: "Project X Fund",
        description: "Funding side project with team",
        saved: 7500,
        goal: 12000,
        members: 4,
        dueDate: "Jul 10",
        status: "Active",
      },
    ],
  };
};

export default mockBackendData;

// mockdata.ts

export type Member = {
  id: number;
  name: string;
  isCurrentReceiver: boolean;
};

export type GroupDetails = {
  id: number;
  title: string;
  description: string;
  members: Member[];
  totalContributed: number;
  nextTurnDate: string;
};

// Simulate async fetching from backend
export const getAjoGroupDetails = async (
  groupId: string
): Promise<GroupDetails | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGroups[groupId]);
    }, 3); // Simulate 300ms network delay
  });
};

// Mock group data
export const mockGroups: Record<string, GroupDetails> = {
  "1": {
    id: 1,
    title: "Family Vacation Fund",
    description: "Saving for our annual family trip to Hawaii",
    totalContributed: 8500,
    members: [
      { id: 1, name: "Sarah", isCurrentReceiver: false },
      { id: 2, name: "John", isCurrentReceiver: true },
      { id: 3, name: "Amina", isCurrentReceiver: false },
      { id: 4, name: "Bola", isCurrentReceiver: false },
    ],
    nextTurnDate: "2025-06-20T12:00:00Z",
  },
  "2": {
    id: 2,
    title: "Wedding Savings",
    description: "Contribution towards Sarah’s wedding",
    totalContributed: 7000,
    members: [
      { id: 1, name: "Sarah", isCurrentReceiver: false },
      { id: 2, name: "Jane", isCurrentReceiver: false },
      { id: 3, name: "Peter", isCurrentReceiver: true },
    ],
    nextTurnDate: "2025-06-22T10:00:00Z",
  },
  "3": {
    id: 3,
    title: "Project X Fund",
    description: "Funding side project with team",
    totalContributed: 7500,
    members: [
      { id: 1, name: "Tunde", isCurrentReceiver: false },
      { id: 2, name: "Ngozi", isCurrentReceiver: false },
      { id: 3, name: "Daniel", isCurrentReceiver: true },
    ],
    nextTurnDate: "2025-07-01T09:00:00Z",
  },
};
