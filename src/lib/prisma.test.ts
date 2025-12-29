export {};

declare global {
  // properties used by the tests
  var __lastAdapterOpts: unknown | undefined;
  var prisma: unknown | undefined;
}

const mockPrismaInstance = { disconnect: jest.fn() };
type PrismaClientMockType = jest.MockedFunction<(...args: unknown[]) => unknown> & { _lastCtorArg?: unknown };
const PrismaClientMock = jest.fn().mockImplementation((opts: unknown) => {
  (PrismaClientMock as unknown as PrismaClientMockType)._lastCtorArg = opts;
  return mockPrismaInstance;
}) as PrismaClientMockType;

jest.mock('../generated/prisma/client', () => ({
  PrismaClient: PrismaClientMock,
}));

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation((opts: unknown) => {
    (global as unknown as { __lastAdapterOpts?: unknown }).__lastAdapterOpts = opts;
    return { adapterMarker: true };
  }),
}));

describe('src/lib/prisma', () => {
  beforeEach(() => {
    jest.resetModules();
    delete (global as unknown as { prisma?: unknown }).prisma;
    process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/testdb';
  });

  it('constructs PrismaPg with DATABASE_URL and passes adapter to PrismaClient', async () => {
    const { default: prisma } = await import('./prisma');

    expect((global as unknown as { __lastAdapterOpts?: unknown }).__lastAdapterOpts).toEqual({
      connectionString: process.env.DATABASE_URL,
    });
    expect(PrismaClientMock).toHaveBeenCalledWith({ adapter: { adapterMarker: true } });
    expect(prisma).toBe(mockPrismaInstance);
  });

  it('reuses global prisma when set (non-production)', async () => {
    const globalClient = { reused: true };
    (global as unknown as { prisma?: unknown }).prisma = globalClient;
    const { default: prisma } = await import('./prisma');
    expect(prisma).toBe(globalClient);
  });
});
