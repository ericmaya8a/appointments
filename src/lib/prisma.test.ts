// Mock the dependencies before importing
const mockPrismaInstance = {
  $extends: jest.fn().mockReturnThis(),
};

const mockPrismaClient = jest.fn(() => mockPrismaInstance);
const mockWithAccelerate = jest.fn(() => 'accelerate-extension');

jest.mock('../generated/prisma', () => ({
  PrismaClient: mockPrismaClient,
}));

jest.mock('@prisma/extension-accelerate', () => ({
  withAccelerate: mockWithAccelerate,
}));

describe('Prisma Client', () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    // Clear all mock calls
    jest.clearAllMocks();

    // Store original NODE_ENV
    originalNodeEnv = process.env.NODE_ENV;

    // Clear the global prisma instance
    const globalForPrisma = global as unknown as {
      prisma?: unknown;
    };
    delete globalForPrisma.prisma;

    // Clear the module cache to ensure fresh imports
    jest.resetModules();
  });

  afterEach(() => {
    // Restore original NODE_ENV
    if (originalNodeEnv !== undefined) {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalNodeEnv,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } else {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: undefined,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
  });

  describe('in development environment', () => {
    it('should create a new PrismaClient instance with accelerate extension', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      await import('./prisma');

      expect(mockPrismaClient).toHaveBeenCalledTimes(1);
      expect(mockPrismaInstance.$extends).toHaveBeenCalledWith('accelerate-extension');
    });

    it('should store the prisma instance globally in development', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      const prisma = await import('./prisma');

      const globalForPrisma = global as unknown as {
        prisma?: unknown;
      };

      expect(globalForPrisma.prisma).toBeDefined();
      expect(globalForPrisma.prisma).toBe(prisma.default);
    });

    it('should reuse existing global prisma instance if available', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      // Set up a mock global prisma instance
      const mockGlobalPrisma = { mockGlobal: true };
      const globalForPrisma = global as unknown as {
        prisma: unknown;
      };
      globalForPrisma.prisma = mockGlobalPrisma;

      const prisma = await import('./prisma');

      // Should not create a new PrismaClient since global one exists
      expect(mockPrismaClient).not.toHaveBeenCalled();
      expect(prisma.default).toBe(mockGlobalPrisma);
    });
  });

  describe('in production environment', () => {
    it('should create a new PrismaClient instance with accelerate extension', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      await import('./prisma');

      expect(mockPrismaClient).toHaveBeenCalledTimes(1);
      expect(mockPrismaInstance.$extends).toHaveBeenCalledWith('accelerate-extension');
    });

    it('should not store the prisma instance globally in production', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      await import('./prisma');

      const globalForPrisma = global as unknown as {
        prisma?: unknown;
      };

      expect(globalForPrisma.prisma).toBeUndefined();
    });

    it('should use existing global instance even in production', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      // Set up a mock global prisma instance
      const mockGlobalPrisma = { mockGlobal: true };
      const globalForPrisma = global as unknown as {
        prisma: unknown;
      };
      globalForPrisma.prisma = mockGlobalPrisma;

      const prisma = await import('./prisma');

      // Should use the global instance, not create a new one
      expect(mockPrismaClient).not.toHaveBeenCalled();
      expect(prisma.default).toBe(mockGlobalPrisma);
      // Global should remain unchanged in production
      expect(globalForPrisma.prisma).toBe(mockGlobalPrisma);
    });
  });

  describe('in test environment', () => {
    it('should create a new PrismaClient instance and store globally', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      const prisma = await import('./prisma');

      expect(mockPrismaClient).toHaveBeenCalledTimes(1);
      expect(mockPrismaInstance.$extends).toHaveBeenCalledWith('accelerate-extension');

      const globalForPrisma = global as unknown as {
        prisma?: unknown;
      };

      expect(globalForPrisma.prisma).toBe(prisma.default);
    });
  });

  describe('when NODE_ENV is undefined', () => {
    it('should create a new PrismaClient instance and store globally', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: undefined,
        writable: true,
        configurable: true,
        enumerable: true,
      });

      const prisma = await import('./prisma');

      expect(mockPrismaClient).toHaveBeenCalledTimes(1);
      expect(mockPrismaInstance.$extends).toHaveBeenCalledWith('accelerate-extension');

      const globalForPrisma = global as unknown as {
        prisma?: unknown;
      };

      expect(globalForPrisma.prisma).toBe(prisma.default);
    });
  });

  describe('module exports', () => {
    it('should export the prisma client as default', async () => {
      const prisma = await import('./prisma');

      expect(prisma.default).toBeDefined();
      expect(typeof prisma.default).toBe('object');
    });

    it('should export the same instance on subsequent imports in non-production', async () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true,
        enumerable: true,
      });

      const prisma1 = await import('./prisma');

      // Clear mocks but keep the global instance
      jest.clearAllMocks();

      const prisma2 = await import('./prisma');

      expect(prisma1.default).toBe(prisma2.default);
      // Should not create a new instance on second import
      expect(mockPrismaClient).not.toHaveBeenCalled();
    });
  });
});
