type NBoolean = null | boolean;
type NNumber = null | number;
type NString = null | string;

type Cores = {
	core_serial: string;
	flight: number;
	block: null | number;
	gridfins: boolean;
	legs: boolean;
	reused: boolean;
	land_success: NBoolean;
	landing_intent: boolean;
	landing_type: NString;
	landing_vehicle: NString;
};

type Orbit = {
	reference_system: string;
	regime: string;
	longitude: NNumber;
	semi_major_axis_km: NNumber;
	eccentricity: NNumber;
	periapsis_km: NNumber;
	apoapsis_km: NNumber;
	inclination_deg: NNumber;
	period_min: NNumber;
	lifespan_years: NNumber;
	epoch: NString;
	mean_motion: NNumber;
	raan: NNumber;
	arg_of_pericenter: NNumber;
	mean_anomaly: NNumber;
};

type Fairings = {
	reused: boolean;
	recovery_attempt: boolean;
	recovered: boolean;
	ship: NString;
};

type TPayload = {
	payload_id: string;
	norad_id: number[];
	reused: boolean;
	customers: string[];
	nationality: string;
	manufacturer: string;
	payload_type: string;
	payload_mass_kg: NNumber;
	payload_mass_lbs: NNumber;
	orbit: string;
	orbit_params: Orbit;
};

type Rocket = {
	rocket_id: string;
	rocket_name: string;
	rocket_type: string;
	first_stage: {
		cores: Cores[];
	};
	second_stage: {
		block: NNumber;
		payloads: TPayload[];
	};
	fairings: Fairings;
};

type LaunchFailure = {
	time: NNumber;
	altitude: NNumber;
	reason: string;
};

type Links = {
	mission_patch: string;
	mission_patch_small: string;
	reddit_campaign: NString;
	reddit_launch: NString;
	reddit_recovery: NString;
	reddit_media: NString;
	presskit: NString;
	article_link: NString;
	wikipedia: NString;
	video_link: NString;
	youtube_id: NString;
	flickr_images: string[];
};

type LaunchSite = {
	site_id: string;
	site_name: string;
	site_name_long: string;
};

type TTimeLine = {
	webcast_liftoff: NNumber;
	go_for_prop_loading: NNumber;
	rp1_loading: NNumber;
	stage1_lox_loading: NNumber;
	stage2_lox_loading: NNumber;
	engine_chill: NNumber;
	prelaunch_checks: NNumber;
	propellant_pressurization: NNumber;
	go_for_launch: NNumber;
	ignition: NNumber;
	liftoff: NNumber;
	maxq: NNumber;
	meco: NNumber;
	stage_sep: NNumber;
	second_stage_ignition: NNumber;
	fairing_deploy: NNumber;
	first_stage_entry_burn: NNumber;
	'seco-1': NNumber;
	first_stage_landing: NNumber;
	second_stage_restart: NNumber;
	'seco-2': NNumber;
	payload_deploy: NNumber;
};

export type TSpaceX = {
	flight_number: number;
	mission_name: string;
	mission_id: string[];
	upcoming: boolean;
	launch_year: string;
	launch_date_unix: number;
	launch_date_utc: string;
	launch_date_local: string;
	is_tentative: boolean;
	tentative_max_precision: 'hour';
	tbd: boolean;
	launch_window: NNumber;
	rocket: Rocket;
	launch_success: boolean;
	ships: string[];
	details: NString;
	static_fire_date_utc: string;
	static_fire_date_unix: NNumber;
	timeline: TTimeLine;
	crew?: string[] | null;
	launch_failure_details?: LaunchFailure;
	links: Links;
	telemetry: {
		flight_club: NString;
	};
	launch_site: LaunchSite;
};
