import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { LigaMagicService } from '../../../../src/modules/providers/ligamagic/service/ligamagic.service';

describe('LigaMagicService', () => {
  let service: LigaMagicService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LigaMagicService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LigaMagicService>(LigaMagicService);
    httpService = module.get<HttpService>(HttpService);

    // Mock o Logger para evitar logs durante os testes
    // jest.spyOn(Logger.prototype, 'error').mockImplementation(() => ({}));
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('getLigaMagicDeck', () => {
    it('should extract deck ID from URL correctly', async () => {
      console.log('test');
      const deckUrl = 'https://www.ligamagic.com.br/?view=dks/deck&id=8935161';
      const commanderName = 'Atraxa';
      const mockResponse = 'Card 1\nCard 2\nCard 3';

      // Mock HTTP response
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        })
      );

      const test = await service.getLigaMagicDeck(deckUrl, commanderName);
      console.log(test);
      // Verifica se a URL foi construída corretamente
      expect(httpService.get).toHaveBeenCalledWith(
        'https://www.ligamagic.com.br/?view=dks/exportar&type=1&id=1234567',
        { responseType: 'text' }
      );
    });

    it('should parse deck data correctly', async () => {
      // Mock data
      const deckUrl = 'https://www.ligamagic.com.br/?view=deck&id=1234567';
      const commanderName = 'Atraxa';
      const mockResponse = 'Card 1\nCard 2\nCard 3';

      // Mock HTTP response
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: mockResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        })
      );

      const result = await service.getLigaMagicDeck(deckUrl, commanderName);

      // Verifica se os dados foram processados corretamente
      expect(result).toEqual(['Card 1', 'Card 2', 'Card 3']);
    });

    it('should return null when HTTP request fails', async () => {
      // Mock data
      const deckUrl = 'https://www.ligamagic.com.br/?view=deck&id=1234567';
      const commanderName = 'Atraxa';

      // Mock HTTP error
      jest.spyOn(httpService, 'get').mockImplementation(() =>
        throwError(() => new Error('Network error'))
      );

      const result = await service.getLigaMagicDeck(deckUrl, commanderName);

      // Verifica se o erro é tratado corretamente
      expect(result).toBeNull();
      expect(Logger.prototype.error).toHaveBeenCalled();
    });
  });
});