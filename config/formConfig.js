/**
 * Configuration for dynamic form fields
 * 
 * This file defines the structure of form templates and field types
 * that can be used to dynamically generate forms in the app.
 */

/**
 * Available field types
 */
export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  TOGGLE: 'toggle',
  DATE: 'date',
  PHOTO: 'photo',
  GPS: 'gps',
};

/**
 * Sample form template - Forest Health Assessment
 */
export const forestHealthTemplate = {
  id: 'forest_health',
  name: 'Forest Health Assessment',
  description: 'Assess the general health and condition of a forest area',
  version: '1.0',
  sections: [
    {
      id: 'general',
      title: 'General Information',
      icon: 'information-circle-outline',
      fields: [
        {
          id: 'title',
          name: 'title',
          label: 'Assessment Title',
          type: FIELD_TYPES.TEXT,
          required: true,
          placeholder: 'Enter a title for this assessment',
        },
        {
          id: 'location',
          name: 'location',
          label: 'Location',
          type: FIELD_TYPES.TEXT,
          required: false,
          placeholder: 'Enter the location',
        },
        {
          id: 'date',
          name: 'date',
          label: 'Assessment Date',
          type: FIELD_TYPES.DATE,
          required: true,
          defaultValue: new Date().toISOString().split('T')[0],
        },
        {
          id: 'hasPhotos',
          name: 'hasPhotos',
          label: 'Include Photos',
          type: FIELD_TYPES.TOGGLE,
          required: false,
          defaultValue: false,
        },
      ],
    },
    {
      id: 'forest_characteristics',
      title: 'Forest Characteristics',
      icon: 'leaf-outline',
      fields: [
        {
          id: 'forest_type',
          name: 'forest_type',
          label: 'Forest Type',
          type: FIELD_TYPES.SELECT,
          required: true,
          options: [
            { label: 'Deciduous', value: 'deciduous' },
            { label: 'Coniferous', value: 'coniferous' },
            { label: 'Mixed', value: 'mixed' },
            { label: 'Tropical', value: 'tropical' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          id: 'dominant_species',
          name: 'dominant_species',
          label: 'Dominant Species',
          type: FIELD_TYPES.MULTISELECT,
          required: false,
          options: [
            { label: 'Oak', value: 'oak' },
            { label: 'Pine', value: 'pine' },
            { label: 'Maple', value: 'maple' },
            { label: 'Birch', value: 'birch' },
            { label: 'Spruce', value: 'spruce' },
            { label: 'Cedar', value: 'cedar' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          id: 'average_age',
          name: 'average_age',
          label: 'Average Stand Age (years)',
          type: FIELD_TYPES.NUMBER,
          required: false,
          placeholder: 'Enter the approximate age',
        },
        {
          id: 'canopy_cover',
          name: 'canopy_cover',
          label: 'Canopy Cover (%)',
          type: FIELD_TYPES.NUMBER,
          required: false,
          placeholder: 'Estimated % of canopy cover',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      id: 'health_indicators',
      title: 'Health Indicators',
      icon: 'pulse-outline',
      fields: [
        {
          id: 'overall_health',
          name: 'overall_health',
          label: 'Overall Forest Health',
          type: FIELD_TYPES.SELECT,
          required: true,
          options: [
            { label: 'Excellent', value: 'excellent' },
            { label: 'Good', value: 'good' },
            { label: 'Fair', value: 'fair' },
            { label: 'Poor', value: 'poor' },
            { label: 'Critical', value: 'critical' },
          ],
        },
        {
          id: 'observed_issues',
          name: 'observed_issues',
          label: 'Observed Issues',
          type: FIELD_TYPES.MULTISELECT,
          required: false,
          options: [
            { label: 'Insect Damage', value: 'insect_damage' },
            { label: 'Disease', value: 'disease' },
            { label: 'Storm Damage', value: 'storm_damage' },
            { label: 'Drought Stress', value: 'drought_stress' },
            { label: 'Fire Damage', value: 'fire_damage' },
            { label: 'Human Impact', value: 'human_impact' },
            { label: 'Wildlife Damage', value: 'wildlife_damage' },
            { label: 'None Observed', value: 'none' },
          ],
        },
        {
          id: 'regeneration',
          name: 'regeneration',
          label: 'Regeneration Status',
          type: FIELD_TYPES.SELECT,
          required: false,
          options: [
            { label: 'Abundant', value: 'abundant' },
            { label: 'Adequate', value: 'adequate' },
            { label: 'Limited', value: 'limited' },
            { label: 'Poor', value: 'poor' },
            { label: 'None', value: 'none' },
          ],
        },
      ],
    },
    {
      id: 'notes',
      title: 'Notes & Observations',
      icon: 'document-text-outline',
      fields: [
        {
          id: 'notes',
          name: 'notes',
          label: 'Additional Notes',
          type: FIELD_TYPES.TEXTAREA,
          required: false,
          placeholder: 'Enter any additional observations or notes',
        },
      ],
    },
  ],
};

/**
 * Get all available form templates
 * 
 * @returns {Array} Array of form templates
 */
export const getFormTemplates = () => {
  return [
    forestHealthTemplate,
    // Add more templates as they are developed
  ];
};

/**
 * Get a specific form template by ID
 * 
 * @param {string} templateId Template ID to retrieve
 * @returns {Object|null} Form template object or null if not found
 */
export const getFormTemplate = (templateId) => {
  const templates = getFormTemplates();
  return templates.find(template => template.id === templateId) || null;
};
