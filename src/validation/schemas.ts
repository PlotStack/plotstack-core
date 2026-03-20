import { z } from 'zod';
import {
  CAMERA_ANGLES, SHOT_TYPES, PLATFORMS, TRANSITIONS,
  PACK_SHOT_TYPES, EXPRESSIONS, LIGHTING_VARIANTS,
  TENANT_PLANS, TEMPLATE_CATEGORIES,
} from '../constants/index.js';

// ── Tenant ──────────────────────────────────────
export const createTenantSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(63).regex(/^[a-z0-9-]+$/),
  plan: z.enum(TENANT_PLANS).default('free'),
});

// ── World ───────────────────────────────────────
export const createWorldSchema = z.object({
  name: z.string().min(1).max(255),
  genre: z.string().max(100).nullish(),
  tone: z.string().max(100).nullish(),
  art_style: z.string().nullish(),
  rules: z.record(z.unknown()).default({}),
  themes: z.array(z.string().max(255)).default([]),
  visual_prompt_defaults: z.string().nullish(),
  video_prompt_defaults: z.string().nullish(),
  lore: z.record(z.unknown()).default({}),
});

export const updateWorldSchema = createWorldSchema.partial();

// ── Location ────────────────────────────────────
export const createLocationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().nullish(),
  physical_details: z.string().nullish(),
  style_notes: z.string().nullish(),
  environmental_rules: z.record(z.unknown()).default({}),
  prompt_fragments: z.record(z.unknown()).default({}),
});

export const updateLocationSchema = createLocationSchema.partial();

// ── Character ───────────────────────────────────
const wardrobeItemSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  is_default: z.boolean().default(false),
});

const emotionalStateSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

const propSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

const relationshipSchema = z.object({
  character_id: z.string().uuid(),
  character_name: z.string(),
  relationship_type: z.string(),
  description: z.string(),
});

export const createCharacterSchema = z.object({
  name: z.string().min(1).max(255),
  role: z.string().max(100).nullish(),
  personality: z.string().nullish(),
  visual_description: z.string().nullish(),
  voice_notes: z.string().nullish(),
  canonical_traits: z.record(z.unknown()).default({}),
  wardrobe: z.array(wardrobeItemSchema).default([]),
  emotional_states: z.array(emotionalStateSchema).default([]),
  props: z.array(propSchema).default([]),
  relationships: z.array(relationshipSchema).default([]),
  character_bible: z.record(z.unknown()).default({}),
});

export const updateCharacterSchema = createCharacterSchema.partial();

// ── Character Image Pack ────────────────────────
const shotListItemSchema = z.object({
  shot_type: z.enum(PACK_SHOT_TYPES),
  expression: z.enum(EXPRESSIONS).default('neutral'),
  wardrobe: z.string().default('default'),
  lighting: z.enum(LIGHTING_VARIANTS).default('studio'),
  priority: z.enum(['required', 'recommended', 'optional']),
  rationale: z.string(),
});

export const createPackSchema = z.object({
  shot_list: z.array(shotListItemSchema).min(1),
  provider_settings: z.record(z.unknown()).default({}),
  notes: z.string().nullish(),
});

export const updatePackSchema = createPackSchema.partial();

export const reviewAssetSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  rating: z.number().int().min(1).max(5).optional(),
  review_notes: z.string().optional(),
});

// ── Video ───────────────────────────────────────
export const createVideoSchema = z.object({
  title: z.string().min(1).max(255),
  platform_target: z.enum(PLATFORMS).nullish(),
  duration_target_seconds: z.number().int().positive().nullish(),
  tone: z.string().max(100).nullish(),
  storyline: z.string().nullish(),
});

export const updateVideoSchema = createVideoSchema.partial();

// ── Scene ───────────────────────────────────────
const sceneCharacterSchema = z.object({
  character_id: z.string().uuid(),
  role_in_scene: z.string().nullish(),
  emotional_state: z.string().nullish(),
  wardrobe_variant: z.string().nullish(),
  position_notes: z.string().nullish(),
});

export const createSceneSchema = z.object({
  location_id: z.string().uuid(),
  camera_angle: z.enum(CAMERA_ANGLES).nullish(),
  shot_type: z.enum(SHOT_TYPES).nullish(),
  action_description: z.string().nullish(),
  dialogue: z.string().nullish(),
  narration: z.string().nullish(),
  sound_cues: z.array(z.record(z.unknown())).default([]),
  timing_seconds: z.number().positive().nullish(),
  continuity_notes: z.record(z.unknown()).default({}),
  transition_in: z.enum(TRANSITIONS).default('cut'),
  transition_out: z.enum(TRANSITIONS).default('cut'),
  characters: z.array(sceneCharacterSchema).default([]),
});

export const updateSceneSchema = createSceneSchema.partial();

// ── Prompt Template ─────────────────────────────
export const createTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  category: z.enum(TEMPLATE_CATEGORIES),
  description: z.string().nullish(),
  steps: z.array(z.object({
    order: z.number().int().positive(),
    name: z.string(),
    instruction: z.string(),
    template: z.string(),
  })).default([]),
  variables: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'enum', 'number', 'boolean']),
    source: z.string().optional(),
    required: z.boolean(),
    default: z.string().optional(),
    description: z.string().optional(),
    options: z.array(z.string()).optional(),
  })).default([]),
  fragments: z.record(z.string()).default({}),
  provider_settings: z.record(z.unknown()).default({}),
  validation_rules: z.array(z.object({
    field: z.string(),
    rule: z.string(),
    value: z.unknown(),
    message: z.string(),
  })).default([]),
  output_schema: z.record(z.unknown()).default({}),
  prompt_content: z.string().nullish(),
  negative_prompt_template: z.string().nullish(),
});

// ── Pagination ──────────────────────────────────
export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  sort: z.string().default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateWorldInput = z.infer<typeof createWorldSchema>;
export type UpdateWorldInput = z.infer<typeof updateWorldSchema>;
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
export type CreateCharacterInput = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterInput = z.infer<typeof updateCharacterSchema>;
export type CreatePackInput = z.infer<typeof createPackSchema>;
export type ReviewAssetInput = z.infer<typeof reviewAssetSchema>;
export type CreateVideoInput = z.infer<typeof createVideoSchema>;
export type CreateSceneInput = z.infer<typeof createSceneSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
