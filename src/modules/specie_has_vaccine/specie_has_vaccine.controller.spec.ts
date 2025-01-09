import { Test, TestingModule } from '@nestjs/testing';
import { SpecieHasVaccineController } from './specie_has_vaccine.controller';
import { SpecieHasVaccineService } from './specie_has_vaccine.service';

describe('SpecieHasVaccineController', () => {
  let controller: SpecieHasVaccineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecieHasVaccineController],
      providers: [SpecieHasVaccineService],
    }).compile();

    controller = module.get<SpecieHasVaccineController>(SpecieHasVaccineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
