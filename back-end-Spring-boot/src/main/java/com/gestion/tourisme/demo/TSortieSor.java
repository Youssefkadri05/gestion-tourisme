package com.gestion.tourisme.demo;

import javax.persistence.*;

@Entity
@Table(name = "t_sortie_sor")
public class TSortieSor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sor_id")
    private Integer sorId;

    @Column(name = "sor_description")
    private String sorDescription;

    // Les relations OneToMany avec TOptionOpt et TReservationRes

    public TSortieSor() {
    }

    public TSortieSor(Integer sorId) {
        this.sorId = sorId;
    }

    public Integer getSorId() {
        return sorId;
    }

    public void setSorId(Integer sorId) {
        this.sorId = sorId;
    }

    public String getSorDescription() {
        return sorDescription;
    }

    public void setSorDescription(String sorDescription) {
        this.sorDescription = sorDescription;
    }

    // Les getters et setters pour les relations OneToMany

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sorId != null ? sorId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TSortieSor)) {
            return false;
        }
        TSortieSor other = (TSortieSor) object;
        if ((this.sorId == null && other.sorId != null) || (this.sorId != null && !this.sorId.equals(other.sorId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "TSortieSor[ sorId=" + sorId + " ]";
    }

}
