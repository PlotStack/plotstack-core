// Core entity types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'team' | 'enterprise';
  credit_balance: number;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface World {
  id: string;
  tenant_id: string;
  version: number;
  is_current: boolean;
  name: string;
  genre: string | null;
  tone: string | null;
  art_style: string | null;
  rules: Record<string, unknown>;
  themes: string[];
  visual_prompt_defaults: string | null;
  video_prompt_defaults: string | null;
  lore: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Location {
  id: string;
  world_id: string;
  tenant_id: string;
  version: number;
  is_current: boolean;
  name: string;
  description: string | null;
  physical_details: string | null;
  style_notes: string | null;
  environmental_rules: Record<string, unknown>;
  prompt_fragments: Record<string, unknown>;
  reference_images: ReferenceImage[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ReferenceImage {
  storage_key: string;
  caption: string;
  is_primary: boolean;
}

export interface Character {
  id: string;
  world_id: string;
  tenant_id: string;
  version: number;
  is_current: boolean;
  name: string;
  role: string | null;
  personality: string | null;
  visual_description: string | null;
  voice_notes: string | null;
  canonical_traits: Record<string, unknown>;
  wardrobe: WardrobeItem[];
  emotional_states: EmotionalState[];
  props: PropItem[];
  relationships: Relationship[];
  character_bible: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WardrobeItem {
  name: string;
  description: string;
  is_default: boolean;
}

export interface EmotionalState {
  name: string;
  description: string;
}

export interface PropItem {
  name: string;
  description: string;
}

export interface Relationship {
  character_id: string;
  character_name: string;
  relationship_type: string;
  description: string;
}

export interface CharacterImagePack {
  id: string;
  character_id: string;
  tenant_id: string;
  version: number;
  is_current: boolean;
  status: PackStatus;
  shot_list: ShotListItem[];
  provider_settings: Record<string, unknown>;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type PackStatus = 'draft' | 'generating' | 'review' | 'approved' | 'archived';

export interface ShotListItem {
  shot_type: string;
  expression: string;
  wardrobe: string;
  lighting: string;
  priority: 'required' | 'recommended' | 'optional';
  rationale: string;
}

export interface PackAsset {
  id: string;
  pack_id: string;
  pack_version: number;
  tenant_id: string;
  shot_type: string;
  variant_label: string | null;
  storage_key: string;
  thumbnail_key: string | null;
  generation_prompt: string;
  negative_prompt: string | null;
  seed: number | null;
  model: string | null;
  provider: string | null;
  provider_metadata: Record<string, unknown>;
  status: AssetStatus;
  rating: number | null;
  review_notes: string | null;
  created_at: string;
}

export type AssetStatus = 'generated' | 'approved' | 'rejected' | 'superseded';

export interface Video {
  id: string;
  world_id: string;
  tenant_id: string;
  title: string;
  status: VideoStatus;
  platform_target: string | null;
  duration_target_seconds: number | null;
  tone: string | null;
  storyline: string | null;
  generation_plan: Record<string, unknown>;
  continuity_state: Record<string, unknown>;
  final_output_key: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type VideoStatus =
  | 'draft' | 'planning' | 'scene_editing' | 'generating'
  | 'review' | 'assembly' | 'final' | 'published';

export interface Scene {
  id: string;
  video_id: string;
  tenant_id: string;
  sequence_order: number;
  location_id: string;
  location_version: number;
  camera_angle: string | null;
  shot_type: string | null;
  action_description: string | null;
  dialogue: string | null;
  narration: string | null;
  sound_cues: Record<string, unknown>[];
  timing_seconds: number | null;
  continuity_notes: Record<string, unknown>;
  transition_in: string;
  transition_out: string;
  assembled_prompt: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SceneCharacter {
  scene_id: string;
  character_id: string;
  character_version: number;
  role_in_scene: string | null;
  emotional_state: string | null;
  wardrobe_variant: string | null;
  position_notes: string | null;
}

export interface GenerationJob {
  id: string;
  tenant_id: string;
  job_type: JobType;
  status: JobStatus;
  source_entity_type: string | null;
  source_entity_id: string | null;
  template_id: string | null;
  template_version: number | null;
  input_data: Record<string, unknown>;
  assembled_prompt: string | null;
  negative_prompt: string | null;
  provider: string | null;
  model: string | null;
  provider_job_id: string | null;
  provider_metadata: Record<string, unknown>;
  cost_credits: number;
  cost_usd: number;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  retry_count: number;
  idempotency_key: string | null;
  created_at: string;
}

export type JobType = 'image_pack_asset' | 'scene_image' | 'scene_video' | 'evaluation';
export type JobStatus = 'queued' | 'active' | 'polling' | 'completed' | 'failed' | 'dead' | 'cancelled';

export interface GeneratedOutput {
  id: string;
  job_id: string;
  tenant_id: string;
  output_type: 'image' | 'video' | 'audio' | 'text';
  storage_key: string;
  thumbnail_key: string | null;
  mime_type: string | null;
  file_size_bytes: number | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface PromptTemplate {
  id: string;
  tenant_id: string | null;
  world_id: string | null;
  version: number;
  is_current: boolean;
  name: string;
  slug: string;
  category: TemplateCategory;
  description: string | null;
  steps: TemplateStep[];
  variables: TemplateVariable[];
  fragments: Record<string, string>;
  provider_settings: Record<string, unknown>;
  validation_rules: ValidationRule[];
  output_schema: Record<string, unknown>;
  prompt_content: string | null;
  negative_prompt_template: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type TemplateCategory = 'world_builder' | 'character_builder' | 'image_pack' | 'scene_builder' | 'video_planner';

export interface TemplateStep {
  order: number;
  name: string;
  instruction: string;
  template: string;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'enum' | 'number' | 'boolean';
  source?: string;
  required: boolean;
  default?: string;
  description?: string;
  options?: string[];
}

export interface ValidationRule {
  field: string;
  rule: string;
  value: unknown;
  message: string;
}

export interface CreditTransaction {
  id: string;
  tenant_id: string;
  job_id: string | null;
  type: 'debit' | 'credit' | 'refund' | 'purchase' | 'grant';
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  cursor: string | null;
  has_more: boolean;
  total_count?: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
