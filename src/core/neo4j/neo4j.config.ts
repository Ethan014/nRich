import neo4j, { Driver } from 'neo4j-driver';

//TODO: Get this username and password with secure config reader and not as hardcoded text
export const neo4jDriver: Driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j', '12345678')
);
