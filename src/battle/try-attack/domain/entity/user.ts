export class User {
  constructor(readonly avatar: Avatar | null) {}
}

export class Avatar {
  constructor(readonly id: string) {}
}
