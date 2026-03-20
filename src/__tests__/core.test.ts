import { describe, it, expect } from 'vitest';
import {
  createWorldSchema, createCharacterSchema, createLocationSchema,
  createVideoSchema, createSceneSchema, createPackSchema,
  reviewAssetSchema, paginationSchema,
} from '../validation/schemas.js';
import { CAMERA_ANGLES, SHOT_TYPES, PLATFORMS, PACK_SHOT_TYPES, EXPRESSIONS } from '../constants/index.js';
import { generateId } from '../utils/id.js';
import { toISO, now, parseDate } from '../utils/dates.js';

describe('Zod Schemas', () => {
  describe('createWorldSchema', () => {
    it('accepts valid world input', () => {
      const result = createWorldSchema.parse({ name: 'Test World', genre: 'Fantasy', tone: 'Epic' });
      expect(result.name).toBe('Test World');
      expect(result.rules).toEqual({});
      expect(result.themes).toEqual([]);
    });

    it('rejects empty name', () => {
      expect(() => createWorldSchema.parse({ name: '' })).toThrow();
    });

    it('applies defaults for optional fields', () => {
      const result = createWorldSchema.parse({ name: 'Minimal World' });
      expect(result.rules).toEqual({});
      expect(result.themes).toEqual([]);
      expect(result.lore).toEqual({});
    });
  });

  describe('createCharacterSchema', () => {
    it('accepts valid character input', () => {
      const result = createCharacterSchema.parse({
        name: 'Hero',
        role: 'Protagonist',
        visual_description: 'Tall with silver hair',
      });
      expect(result.name).toBe('Hero');
      expect(result.wardrobe).toEqual([]);
    });

    it('accepts full character with wardrobe', () => {
      const result = createCharacterSchema.parse({
        name: 'Villain',
        wardrobe: [{ name: 'Armor', description: 'Dark plate armor', is_default: true }],
        emotional_states: [{ name: 'Angry', description: 'Raging fury' }],
      });
      expect(result.wardrobe).toHaveLength(1);
      expect(result.emotional_states).toHaveLength(1);
    });

    it('rejects invalid relationship', () => {
      expect(() => createCharacterSchema.parse({
        name: 'Test',
        relationships: [{ character_id: 'not-a-uuid', character_name: 'X', relationship_type: 'ally', description: 'test' }],
      })).toThrow();
    });
  });

  describe('createLocationSchema', () => {
    it('accepts valid location', () => {
      const result = createLocationSchema.parse({ name: 'Town Square' });
      expect(result.name).toBe('Town Square');
    });
  });

  describe('createVideoSchema', () => {
    it('accepts valid video with platform', () => {
      const result = createVideoSchema.parse({
        title: 'My Video',
        platform_target: 'tiktok',
        duration_target_seconds: 60,
      });
      expect(result.platform_target).toBe('tiktok');
    });

    it('rejects invalid platform', () => {
      expect(() => createVideoSchema.parse({ title: 'Test', platform_target: 'invalid' })).toThrow();
    });
  });

  describe('createSceneSchema', () => {
    it('accepts scene with valid camera angle', () => {
      const result = createSceneSchema.parse({
        location_id: generateId(),
        camera_angle: 'wide',
        shot_type: 'establishing',
      });
      expect(result.camera_angle).toBe('wide');
    });

    it('rejects invalid camera angle', () => {
      expect(() => createSceneSchema.parse({
        location_id: generateId(),
        camera_angle: 'invalid_angle',
      })).toThrow();
    });
  });

  describe('createPackSchema', () => {
    it('accepts valid pack with shot list', () => {
      const result = createPackSchema.parse({
        shot_list: [{
          shot_type: 'front_portrait',
          expression: 'neutral',
          wardrobe: 'default',
          lighting: 'studio',
          priority: 'required',
          rationale: 'Main reference image',
        }],
      });
      expect(result.shot_list).toHaveLength(1);
    });

    it('rejects empty shot list', () => {
      expect(() => createPackSchema.parse({ shot_list: [] })).toThrow();
    });
  });

  describe('reviewAssetSchema', () => {
    it('accepts approved with rating', () => {
      const result = reviewAssetSchema.parse({ status: 'approved', rating: 4 });
      expect(result.status).toBe('approved');
    });

    it('rejects rating out of range', () => {
      expect(() => reviewAssetSchema.parse({ status: 'approved', rating: 6 })).toThrow();
    });
  });

  describe('paginationSchema', () => {
    it('applies defaults', () => {
      const result = paginationSchema.parse({});
      expect(result.limit).toBe(25);
      expect(result.order).toBe('desc');
    });

    it('coerces string limit', () => {
      const result = paginationSchema.parse({ limit: '10' });
      expect(result.limit).toBe(10);
    });
  });
});

describe('Constants', () => {
  it('has camera angles', () => {
    expect(CAMERA_ANGLES).toContain('wide');
    expect(CAMERA_ANGLES).toContain('close_up');
    expect(CAMERA_ANGLES.length).toBeGreaterThan(5);
  });

  it('has shot types', () => {
    expect(SHOT_TYPES).toContain('establishing');
    expect(SHOT_TYPES).toContain('action');
  });

  it('has platforms', () => {
    expect(PLATFORMS).toContain('tiktok');
    expect(PLATFORMS).toContain('youtube_short');
  });

  it('has pack shot types', () => {
    expect(PACK_SHOT_TYPES).toContain('front_portrait');
    expect(PACK_SHOT_TYPES).toContain('full_body_front');
  });

  it('has expressions', () => {
    expect(EXPRESSIONS).toContain('neutral');
    expect(EXPRESSIONS).toContain('happy');
  });
});

describe('Utils', () => {
  it('generateId returns a UUID', () => {
    const id = generateId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('generateId returns unique values', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it('toISO returns ISO string', () => {
    const iso = toISO(new Date('2026-01-01'));
    expect(iso).toContain('2026');
  });

  it('now returns current time ISO', () => {
    const n = now();
    expect(new Date(n).getFullYear()).toBeGreaterThanOrEqual(2026);
  });

  it('parseDate handles valid and invalid inputs', () => {
    expect(parseDate('2026-01-01T00:00:00Z')).toBeInstanceOf(Date);
    expect(parseDate('not-a-date')).toBeNull();
  });
});
