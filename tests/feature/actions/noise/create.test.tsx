import { describe, expect, it, vi } from "vitest";
import { createNoise } from "@/lib/noise/actions/create";
import { noiseRepository } from "@/lib/noise/repository";

vi.mock("@/lib/auth/config", () => ({
  auth: vi.fn().mockResolvedValue({
    user: {
      id: "a1zspadi7i7fvs893q97hq3",
      name: "Jon Doe",
      email: "jondoe@test.com",
    },
  }),
}));

const getTestData = () => {
  return {
    description: "Weird noise",
    category: "Traffic",
    lng: 51.52700864445432,
    lat: -0.11432647705078126,
    dateOfNoise: new Date(),
  }
}

vi.mock("@/lib/noise/repository", () => ({
  noiseRepository: {
    findCategoryByName: vi.fn(),
    createNoise: vi.fn(),
  },
}));

const mockedNoiseRepo = vi.mocked(noiseRepository)

describe("createNoise()", () => {
  it("returns validation error when no valid category exists", async () => {
    mockedNoiseRepo.findCategoryByName.mockResolvedValue(null)

    const data = await createNoise(getTestData());
    expect(data.success).toBe(false);
  })

  it("returns noise data with no validation errors", async () => {
    mockedNoiseRepo.findCategoryByName.mockResolvedValue({
      name: "Traffic"
    } as any)
    mockedNoiseRepo.createNoise.mockResolvedValue({
      description: "Weird noise"
    } as any)

    const data = await createNoise(getTestData());

    expect(data).toMatchObject({ success: true, data: { description: 'Weird noise' } })
  })
})