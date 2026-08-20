package com.hamarashops.business.model;

import java.util.List;

public class Industry {
    private String id;
    private String slug;
    private String name;
    private String subtitle;
    private String description;
    private String category;
    private List<String> keyCapabilities;
    private List<String> useCases;
    private List<String> impactMetrics;

    public Industry() {}

    public Industry(String id, String slug, String name, String subtitle, String description, String category, List<String> keyCapabilities, List<String> useCases, List<String> impactMetrics) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.subtitle = subtitle;
        this.description = description;
        this.category = category;
        this.keyCapabilities = keyCapabilities;
        this.useCases = useCases;
        this.impactMetrics = impactMetrics;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getKeyCapabilities() {
        return keyCapabilities;
    }

    public void setKeyCapabilities(List<String> keyCapabilities) {
        this.keyCapabilities = keyCapabilities;
    }

    public List<String> getUseCases() {
        return useCases;
    }

    public void setUseCases(List<String> useCases) {
        this.useCases = useCases;
    }

    public List<String> getImpactMetrics() {
        return impactMetrics;
    }

    public void setImpactMetrics(List<String> impactMetrics) {
        this.impactMetrics = impactMetrics;
    }
}
