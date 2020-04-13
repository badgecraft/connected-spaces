import { initTracerFromEnv } from 'jaeger-client';
// import { PrometheusMetricsFactory } from 'jaeger-client';
// import promClient from 'prom-client';

export default ({ pkg, serviceName }) => {
    // promClient.register.removeSingleMetric(serviceName);
    return initTracerFromEnv(
        { serviceName },
        {
            // metrics: new PrometheusMetricsFactory(promClient, serviceName),
            tags: {
                [`${serviceName}.version`]: pkg.version,
            },
        },
    );
};
