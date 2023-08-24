

USE ``; --TABLE NAME

CREATE TABLE IF NOT EXISTS `polizia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editor` varchar(255) DEFAULT '',
  `category` varchar(255) DEFAULT '',
  `reato` varchar(255) DEFAULT '',
  `anni_prigione` int(11) DEFAULT NULL,
  `euro` varchar(255) DEFAULT '',
  `sospetto` varchar(255) NOT NULL DEFAULT '',
  `targa_veicolo` varchar(50) DEFAULT '',
  `data` varchar(50) DEFAULT '',
  `oggetti_sequestrati` varchar(2555) DEFAULT '',
  `confessione` varchar(2555) DEFAULT '',
  `rapporto` varchar(2555) DEFAULT '',
  `data_nascita` varchar(10) DEFAULT '',
  `matricola` varchar(7) DEFAULT '',
  KEY `Indice 1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=483 DEFAULT CHARSET=utf8;

