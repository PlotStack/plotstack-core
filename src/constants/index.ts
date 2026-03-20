// Camera angles for scene composition
export const CAMERA_ANGLES = [
  'wide', 'medium', 'close_up', 'extreme_close_up',
  'over_shoulder', 'low_angle', 'high_angle',
  'birds_eye', 'dutch', 'pov',
] as const;
export type CameraAngle = typeof CAMERA_ANGLES[number];

// Shot types for scene classification
export const SHOT_TYPES = [
  'establishing', 'action', 'reaction', 'dialogue',
  'transition', 'montage', 'detail',
] as const;
export type ShotType = typeof SHOT_TYPES[number];

// Image pack shot types
export const PACK_SHOT_TYPES = [
  'front_portrait', 'full_body_front', 'three_quarter',
  'side_profile', 'back', 'close_up', 'action_pose',
] as const;
export type PackShotType = typeof PACK_SHOT_TYPES[number];

// Expression variants for image packs
export const EXPRESSIONS = [
  'neutral', 'happy', 'angry', 'sad', 'surprised',
] as const;
export type Expression = typeof EXPRESSIONS[number];

// Lighting variants
export const LIGHTING_VARIANTS = [
  'studio', 'warm', 'cool', 'dramatic',
] as const;
export type LightingVariant = typeof LIGHTING_VARIANTS[number];

// Transition types
export const TRANSITIONS = [
  'cut', 'fade', 'dissolve', 'wipe',
] as const;
export type Transition = typeof TRANSITIONS[number];

// Platform targets
export const PLATFORMS = [
  'tiktok', 'youtube_short', 'youtube', 'instagram_reel',
] as const;
export type Platform = typeof PLATFORMS[number];

// Status enums
export const WORLD_STATUSES = ['draft', 'active', 'archived'] as const;
export const PACK_STATUSES = ['draft', 'generating', 'review', 'approved', 'archived'] as const;
export const ASSET_STATUSES = ['generated', 'approved', 'rejected', 'superseded'] as const;
export const VIDEO_STATUSES = [
  'draft', 'planning', 'scene_editing', 'generating',
  'review', 'assembly', 'final', 'published',
] as const;
export const JOB_STATUSES = [
  'queued', 'active', 'polling', 'completed', 'failed', 'dead', 'cancelled',
] as const;
export const JOB_TYPES = [
  'image_pack_asset', 'scene_image', 'scene_video', 'evaluation',
] as const;
export const TEMPLATE_CATEGORIES = [
  'world_builder', 'character_builder', 'image_pack', 'scene_builder', 'video_planner',
] as const;
export const TENANT_PLANS = ['free', 'pro', 'team', 'enterprise'] as const;

// Limits
export const MAX_PACK_ASSETS = 30;
export const MAX_VARIANTS_PER_SHOT = 5;
export const DEFAULT_CREDITS = 100;
export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;
