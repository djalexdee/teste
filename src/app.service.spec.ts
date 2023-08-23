import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './app.service';

describe('MathService', () => {
  let mathService: MathService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();
    mathService = module.get<MathService>(MathService);
  });
  describe('add', () => {
    it('should return the correct sum of two positive integers', () => {
      const result = mathService.add(3, 5);
      expect(result).toBe(8);
    });
    it('should return the correct sum of two negative integers', () => {
      const result = mathService.add(-3, -5);
      expect(result).toBe(-8);
    });
    it('should return zero when both input numbers are zero', () => {
      const result = mathService.add(0, 0);
      expect(result).toBe(0);
    });
  });
});
