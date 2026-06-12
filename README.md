\# k6 Performance Testing Suite



Performance testing project for a REST API using k6, with CI/CD integration via Jenkins.



\## Tools Used

\- k6 — performance testing

\- Jenkins — CI/CD pipeline

\- Grafana — metrics visualization



\## Test Scenarios



| Test | Virtual Users | Duration | p95 Threshold |

|------|--------------|----------|---------------|

| Smoke Test | 3 | 30s | < 2000ms |

| Load Test | 10 | 1m50s | < 3000ms |

| Stress Test | 50 | 2m | < 5000ms |



\## Key Findings



| Test | p95 Latency | Result |

|------|-------------|--------|

| Smoke | 324ms | ✅ Pass |

| Load | 3840ms | ❌ Fail |

| Stress | 3560ms | ✅ Pass |



\## Performance Analysis

\- API performs well under low load (3 users, p95 = 324ms)

\- Performance degrades significantly at 10 concurrent users (p95 = 3.84s, breaching 3s threshold)

\- Surprisingly stabilizes at 50 users (p95 = 3.56s) — suggests a connection pool warm-up issue

\- Maximum response time of 56.9s observed during stress test — indicates occasional severe latency spikes



\## Recommendations

\- Investigate connection pooling configuration

\- Implement caching for frequently requested endpoints

\- Set up alerting when p95 latency exceeds 2s in production



\## CI/CD Integration

Jenkins pipeline automatically runs all 3 test stages on every code push and fails the build if thresholds are breached.

