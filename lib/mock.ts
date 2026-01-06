export const mockUser = [{
  id: 'user_001',
  email: 'admin@tenant1.com',
  password: '123456789',
  name: 'Admin Tenant 1',
  tenant: {
    id: 'tenant_001',
    slug: 'tenant-mock',
    name: 'Tenant 1 Company',
  },
  role: 'ADMIN',
}];

export const mockToken = 'mock-access-token';

export const mockLogin = (email: string, pass: string) => {
  const user = mockUser.find(
    u => u.email === email && u.password === pass
  );

  if (!user) return null

  return {
    accessToken: mockToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      tenant: user.tenant,
    },
  }
};
