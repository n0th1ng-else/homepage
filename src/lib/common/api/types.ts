export interface UrlResponse {
	url: string;
}

export interface Version {
	version: string;
	versionBuild: string;
}

export enum ApplicationStatus {
	OK = 'OK'
}

export interface StatusDto {
	status: ApplicationStatus;
	version: string;
	uptime: string;
}
