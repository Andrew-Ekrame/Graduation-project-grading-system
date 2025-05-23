export interface AcceptedProjectsForRequestRes {
  statusCode: number;
  message: string;
  data: {
    isSuccess: boolean;
    acceptedProjectIdeasForDoctor: AcceptedProjectForRequest[];
  };
}

export interface AcceptedProjectForRequest {
  id: number;
  name: string;
  description: string;
  submissionDate: string;
  status: string;
  doctorId: number;
  doctorName: string;
}

export const Projects: AcceptedProjectForRequest[] = [
  {
    id: 1,
    name: 'Blogs',
    description:
      'Create blogs for literary characters or historical figures. Create an actual blog for free at blogger.com or just have students write and organize articles on white printer paper if the internet is not available.',
    submissionDate: '2025-03-31T01:34:36',
    status: 'Accepted',
    doctorId: 1,
    doctorName: 'Dr Ahmed',
  },
  {
    id: 3,
    name: 'ffgf',
    description: '<p>fgfgfg</p>',
    submissionDate: '2025-04-17T12:23:35.3473159',
    status: 'Accepted',
    doctorId: 1,
    doctorName: 'Dr Ahmed',
  },
  {
    id: 12,
    name: 'testing on 27/4',
    description:
      '<p>gngoinortnotnit</p><h1>fgfmgfknfpkgnfp</h1><p><span class="ql-size-large">fgfkgnkgnfkgngn</span></p><p><strong>b,pogmbpom</strong></p>',
    submissionDate: '2025-04-27T01:36:54',
    status: 'Accepted',
    doctorId: 1,
    doctorName: 'Dr Ahmed',
  },
  {
    id: 13,
    name: 'Testing from doctor',
    description:
      '<p>testing</p><p> testing testing testing testing testing testing</p>',
    submissionDate: '2025-04-30T23:24:09.6064149',
    status: 'Accepted',
    doctorId: 1,
    doctorName: 'Dr Ahmed',
  },
];
