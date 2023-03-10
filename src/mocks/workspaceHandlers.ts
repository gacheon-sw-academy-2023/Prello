import { IDeleteWorkspace, IUser, IWorkspace } from '@/utils/types';
import { getAllByAltText } from '@testing-library/react';
import { rest } from 'msw';
import { useIndexedDB } from 'react-indexed-db';
const { getAll, add, getByID, deleteRecord, update } =
  useIndexedDB('workspace');

export const workspaceHandlers = [
  rest.get('/api/v1/workspaces', async (req: any, res, ctx) => {
    let Workspace;
    const workspaceId = req.url.searchParams.get('workspaceId');
    console.log(workspaceId);
    try {
      await getByID(workspaceId).then((workspaceInfo) => {
        Workspace = workspaceInfo;
      });
      return res(ctx.status(200), ctx.delay(1000), ctx.json(Workspace));
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.delay(1000),
        ctx.json({ message: 'Store in DB Failed!' }),
      );
    }
  }),
  rest.post('/api/v1/workspaces', async (req, res, ctx) => {
    const { owner, name, summary, memberInfo } = await req.json<IWorkspace>();

    try {
      await add({
        owner: owner,
        name: name,
        summary: summary,
        memberInfo: memberInfo,
      });
      return res(
        ctx.status(200),
        ctx.json({ message: 'Workspace Creation Success!' }),
      );
    } catch (error) {
      return res(ctx.status(500), ctx.json({ message: 'Store in DB Failed!' }));
    }
  }),

  rest.get('/api/v1/workspaces/created', async (req, res, ctx) => {
    let CWorkspaces: IWorkspace[] = [];
    const email = req.url.searchParams.get('email');

    await getAll().then((workspaces: IWorkspace[]) => {
      CWorkspaces = workspaces.filter(({ owner }) => owner === email);
    });

    return res(ctx.status(200), ctx.delay(1000), ctx.json(CWorkspaces));
  }),

  rest.get('/api/v1/workspaces/participated', async (req, res, ctx) => {
    let PWorkspaces: IWorkspace[] = [];
    const email = req.url.searchParams.get('email');

    if (email) {
      await getAll().then((workspaces: IWorkspace[]) => {
        {
          workspaces.map((workspace) =>
            workspace.memberInfo.includes(email)
              ? (PWorkspaces = [...PWorkspaces, workspace])
              : (PWorkspaces = PWorkspaces),
          );
        }
      });
    }

    return res(ctx.status(200), ctx.delay(1000), ctx.json(PWorkspaces));
  }),

  rest.delete('/api/v1/workspaces/', async (req: any, res, ctx) => {
    try {
      await deleteRecord(req.body.workspaceId);

      return res(
        ctx.status(200),
        ctx.json({ message: 'Workspace Delete Success!' }),
      );
    } catch {
      return res(ctx.status(500), ctx.json({ message: 'Fail to Delete Data' }));
    }
  }),

  rest.put('/api/v1/workspaces', async (req: any, res, ctx) => {
    try {
      const workspace = await getByID(req.body.id);

      update({
        owner: workspace.owner,
        name: req.body.name,
        summary: req.body.summary,
        id: workspace.id,
        memberInfo: workspace.memberInfo,
      });

      return res(
        ctx.status(200),
        ctx.json({ message: 'Workspace Update Success!' }),
      );
    } catch {
      return res(ctx.status(500), ctx.json({ message: 'Fail to Update Data' }));
    }
  }),

  rest.put('/api/v1/workspaces', async (req: any, res, ctx) => {
    try {
      const workspace = await getByID(req.body.id);

      update({
        owner: workspace.owner,
        name: req.body.name,
        summary: req.body.summary,
        id: workspace.id,
        memberInfo: workspace.memberInfo,
      });

      return res(
        ctx.status(200),
        ctx.json({ message: 'Workspace Update Success!' }),
      );
    } catch {
      return res(ctx.status(500), ctx.json({ message: 'Fail to Update Data' }));
    }
  }),
  rest.put('/api/v1/workspaces/member', async (req: any, res, ctx) => {
    try {
      const workspace = await getByID(req.body.id);

      update({
        owner: workspace.owner,
        name: workspace.name,
        summary: workspace.summary,
        id: workspace.id,
        memberInfo: workspace.memberInfo.concat(req.body.memberInfo),
      });

      return res(
        ctx.status(200),
        ctx.json({ message: 'Workspace Update Success!' }),
      );
    } catch {
      return res(ctx.status(500), ctx.json({ message: 'Fail to Update Data' }));
    }
  }),
];
