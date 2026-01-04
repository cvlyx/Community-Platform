// User role types (shared between client and server)
export enum UserRole {
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
  SERVICE_SEEKER = "SERVICE_SEEKER",
  ADMIN = "ADMIN",
}

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  COMMUNITY_VERIFIED = "COMMUNITY_VERIFIED",
  SYSTEM_VERIFIED = "SYSTEM_VERIFIED",
}

export enum JobStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

