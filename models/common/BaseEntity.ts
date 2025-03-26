/**
 * Represents the base entity interface.
 * All entities should extend this interface to inherit the common properties.
 */
export interface BaseEntity {
  /**
   * The unique identifier of the entity.
   * @type {string}
   */
  id: string;
}
