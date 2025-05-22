import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

/**
 * A generic API service for AWS Amplify Gen 2 models.
 * Provides CRUD operations for any model.
 */
class ApiService {
  private client: any;

  /**
   * Initializes the Amplify client instance.
   */
  private async initClient() {
    if (!this.client) {
      this.client = await generateClient();
    }
  }

  /**
   * Fetches all records for the specified model.
   * @param modelName - The name of the model (e.g., 'Contact', 'Activity')
   * @param filter - Optional filter criteria
   * @returns An array of model instances
   */
  public async fetchAll<T>(modelName: string, filter?: any): Promise<T[]> {
    await this.initClient();
    const Model = this.client.models[modelName];
    return await Model.query(filter);
  }

  /**
   * Fetches a single record by ID for the specified model.
   * @param modelName - The name of the model (e.g., 'Contact', 'Activity')
   * @param id - The ID of the record to fetch
   * @returns The model instance or null if not found
   */
  public async fetchById<T>(modelName: string, id: string): Promise<T | null> {
    await this.initClient();
    const Model = this.client.models[modelName];
    return await Model.get(id);
  }

  /**
   * Creates a new record for the specified model.
   * @param modelName - The name of the model (e.g., 'Contact', 'Activity')
   * @param input - The input object for the new record
   * @returns The newly created model instance
   */
  public async create<T>(modelName: string, input: Partial<T>): Promise<T> {
    await this.initClient();
    const Model = this.client.models[modelName];
    return await Model.create(input);
  }

  /**
   * Updates an existing record for the specified model.
   * @param modelName - The name of the model (e.g., 'Contact', 'Activity')
   * @param id - The ID of the record to update
   * @param input - The input object with updated fields
   * @returns The updated model instance
   */
  public async update<T>(
    modelName: string,
    id: string,
    input: Partial<T>
  ): Promise<T> {
    await this.initClient();
    const Model = this.client.models[modelName];
    const existing = await Model.get(id);
    if (!existing) {
      throw new Error(`${modelName} with ID ${id} not found.`);
    }
    return await Model.update(existing, (draft: any) => {
      Object.assign(draft, input);
    });
  }

  /**
   * Deletes a record for the specified model.
   * @param modelName - The name of the model (e.g., 'Contact', 'Activity')
   * @param id - The ID of the record to delete
   * @returns void
   */
  public async delete(modelName: string, id: string): Promise<void> {
    await this.initClient();
    const Model = this.client.models[modelName];
    await Model.delete(id);
  }
}

// Export a singleton instance of the ApiService
const apiService = new ApiService();
export default apiService;