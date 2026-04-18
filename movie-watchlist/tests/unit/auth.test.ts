import { registerUser, loginUser } from "@/lib/services/auth.service";
import { prismaMock } from "./singleton";
import { UserFactory } from "../factories/user.factory";
import bcrypt from "bcrypt";

// MOCK DEPENDENCIES
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn().mockResolvedValue("dummysalt"),
}));

jest.mock("jose", () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mocked.jwt.token"),
  })),
  jwtVerify: jest.fn(),
}));

describe("Modul Autentikasi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser()", () => {
    it("should create user successfully when input is valid (Happy Path)", async () => {
      // ARRANGE — Siapkan mock Prisma dan data statis (Dummy User)
      const dummyUser = UserFactory.build({ email: "test@domain.com" });
      const mockHash = "$2b$10$hashedpassword";
      
      prismaMock.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);
      prismaMock.user.create.mockResolvedValue(dummyUser);

      // ACT — Jalankan fungsi utama
      const result = await registerUser("test@domain.com", "validpassword123");

      // ASSERT — Verifikasi keterpanggilan dan hasil return
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@domain.com" } });
      expect(bcrypt.hash).toHaveBeenCalledWith("validpassword123", "dummysalt");
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: { email: "test@domain.com", password_hash: mockHash, name: null },
        select: { id: true, email: true, name: true }
      });
      // Memastikan tipe nilai kembalian terstruktur sesuai yang diharapkan (Pola AAA selesai)
      expect(result).toMatchObject({ email: "test@domain.com" });
    });

    it("should throw ValidationError when input invalid format or boundary empty (Boundary Values)", async () => {
      // ARRANGE (Tidak membutuhkan intervensi Prisma karena penolakan terjadi di Service Level)

      // ACT & ASSERT: Menguji penolakan Password Kosong
      await expect(registerUser("valid@email.com", ""))
        .rejects.toThrow("Password tidak boleh kosong");

      // ACT & ASSERT: Menguji penolakan Format Email
      await expect(registerUser("not-an-email", "validpassword123"))
        .rejects.toThrow("Format email tidak valid");
    });

    it("should throw Error when email is already occupied (Edge Case - Email Duplikat)", async () => {
      // ARRANGE
      const existingUser = UserFactory.build({ email: "already@domain.com" });
      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      // ACT & ASSERT
      await expect(registerUser("already@domain.com", "password123"))
        .rejects.toThrow("Email sudah terdaftar");
      
      // Pastikan rekor palsu tidak berusaha dipanggil 
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it("should propagate error when database server crashes (Error Handling)", async () => {
      // ARRANGE
      prismaMock.user.findUnique.mockRejectedValue(new Error("Database connection timeout"));

      // ACT & ASSERT
      await expect(registerUser("test@domain.com", "password123"))
        .rejects.toThrow("Database connection timeout");
    });
  });

  describe("loginUser()", () => {
    it("should bypass and issue JWT token when credentials are valid (Happy Path)", async () => {
      // ARRANGE
      const dummyUser = UserFactory.build({ email: "test@domain.com" });
      prismaMock.user.findUnique.mockResolvedValue(dummyUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // ACT
      const result = await loginUser("test@domain.com", "correctpassword");

      // ASSERT
      expect(result).toBe("mocked.jwt.token");
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@domain.com" } });
      expect(bcrypt.compare).toHaveBeenCalledWith("correctpassword", dummyUser.password_hash);
    });

    it("should throw error when fields are blank (Boundary Values)", async () => {
      // ACT & ASSERT
      await expect(loginUser("", "password123")).rejects.toThrow("Format input tidak lengkap");
      await expect(loginUser("test@domain.com", "")).rejects.toThrow("Format input tidak lengkap");
    });

    it("should throw error strictly when user doesn't exist (Invalid Input)", async () => {
      // ARRANGE
      prismaMock.user.findUnique.mockResolvedValue(null);

      // ACT & ASSERT
      await expect(loginUser("wrong@domain.com", "password123")).rejects.toThrow("Kredensial salah");
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("should throw error strictly when password hashes clash (Invalid Input / Mismatch)", async () => {
      // ARRANGE
      const dummyUser = UserFactory.build({ email: "test@domain.com" });
      prismaMock.user.findUnique.mockResolvedValue(dummyUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // ACT & ASSERT
      await expect(loginUser(dummyUser.email, "wrongpassword123")).rejects.toThrow("Kredensial salah");
    });

    it("should break gracefully and log issue when database is down (Error Handling)", async () => {
      // ARRANGE
      prismaMock.user.findUnique.mockRejectedValue(new Error("Database unreachable"));

      // ACT & ASSERT
      await expect(loginUser("test@domain.com", "password")).rejects.toThrow("Database unreachable");
    });
  });
});
