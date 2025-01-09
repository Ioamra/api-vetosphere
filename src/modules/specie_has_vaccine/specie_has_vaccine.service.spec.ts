import { Test, TestingModule } from '@nestjs/testing';
import { SpecieHasVaccineService } from './specie_has_vaccine.service';

describe('SpecieHasVaccineService', () => {
  let service: SpecieHasVaccineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecieHasVaccineService],
    }).compile();

    service = module.get<SpecieHasVaccineService>(SpecieHasVaccineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
