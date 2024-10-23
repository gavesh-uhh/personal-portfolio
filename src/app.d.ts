// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

  type Lecture = {
    class: string | null;
    branch: string | null;
    floor: string | null;
    lecturer: string | null;
    time: string | null;
    on_going: boolean;
    offset: number;
  };

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
