/* eslint-disable @typescript-eslint/naming-convention */
export interface Task {
  task_number?: number;
  type: string;
  state?: string;
  description: string;
  date_generation?: Date;
  date_closing?: Date;
  start_time?: string;
  end_time?: string;
  hour_man?: string;
  image_before?: string;
  image_after?: string;
  turn: string;
  name?: string;
  position?: string;
  username?: string;
}
