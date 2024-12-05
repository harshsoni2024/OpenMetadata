/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

 /**
 * Sap Hana Database Connection Config
 */
export interface SapHanaConnection {
    /**
     * Choose between Database connection or HDB User Store connection.
     */
    connection:               SAPHanaConnection;
    connectionArguments?:     { [key: string]: any };
    connectionOptions?:       { [key: string]: string };
    sampleDataStorageConfig?: SampleDataStorageConfig;
    /**
     * SQLAlchemy driver scheme options.
     */
    scheme?:                     SapHanaScheme;
    supportsDataDiff?:           boolean;
    supportsDBTExtraction?:      boolean;
    supportsLineageExtraction?:  boolean;
    supportsMetadataExtraction?: boolean;
    supportsProfiler?:           boolean;
    supportsQueryComment?:       boolean;
    /**
     * Service Type
     */
    type?: SapHanaType;
}

/**
 * Choose between Database connection or HDB User Store connection.
 *
 * Sap Hana Database SQL Connection Config
 *
 * Sap Hana Database HDB User Store Connection Config
 */
export interface SAPHanaConnection {
    /**
     * Database of the data source.
     */
    database?: string;
    /**
     * Database Schema of the data source. This is an optional parameter, if you would like to
     * restrict the metadata reading to a single schema. When left blank, OpenMetadata Ingestion
     * attempts to scan all the schemas.
     */
    databaseSchema?: string;
    /**
     * Host and port of the Hana service.
     */
    hostPort?: string;
    /**
     * Password to connect to Hana.
     */
    password?: string;
    /**
     * Username to connect to Hana. This user should have privileges to read all the metadata.
     */
    username?: string;
    /**
     * HDB Store User Key generated from the command `hdbuserstore SET <KEY> <host:port>
     * <USERNAME> <PASSWORD>`
     */
    userKey?: string;
}

/**
 * Storage config to store sample data
 */
export interface SampleDataStorageConfig {
    config?: DataStorageConfig;
}

/**
 * Storage config to store sample data
 */
export interface DataStorageConfig {
    /**
     * Bucket Name
     */
    bucketName?: string;
    /**
     * Provide the pattern of the path where the generated sample data file needs to be stored.
     */
    filePathPattern?: string;
    /**
     * When this field enabled a single parquet file will be created to store sample data,
     * otherwise we will create a new file per day
     */
    overwriteData?: boolean;
    /**
     * Prefix of the data source.
     */
    prefix?:        string;
    storageConfig?: AwsCredentials;
    [property: string]: any;
}

/**
 * AWS credentials configs.
 */
export interface AwsCredentials {
    /**
     * The Amazon Resource Name (ARN) of the role to assume. Required Field in case of Assume
     * Role
     */
    assumeRoleArn?: string;
    /**
     * An identifier for the assumed role session. Use the role session name to uniquely
     * identify a session when the same role is assumed by different principals or for different
     * reasons. Required Field in case of Assume Role
     */
    assumeRoleSessionName?: string;
    /**
     * The Amazon Resource Name (ARN) of the role to assume. Optional Field in case of Assume
     * Role
     */
    assumeRoleSourceIdentity?: string;
    /**
     * AWS Access key ID.
     */
    awsAccessKeyId?: string;
    /**
     * AWS Region
     */
    awsRegion?: string;
    /**
     * AWS Secret Access Key.
     */
    awsSecretAccessKey?: string;
    /**
     * AWS Session Token.
     */
    awsSessionToken?: string;
    /**
     * EndPoint URL for the AWS
     */
    endPointURL?: string;
    /**
     * The name of a profile to use with the boto session.
     */
    profileName?: string;
}

/**
 * SQLAlchemy driver scheme options.
 */
export enum SapHanaScheme {
    Hana = "hana",
}

/**
 * Service Type
 *
 * Service type.
 */
export enum SapHanaType {
    SapHana = "SapHana",
}