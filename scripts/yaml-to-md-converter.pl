#!/usr/bin/env perl

use strict;
use warnings;
use File::Basename;
use File::Path qw(make_path);
use YAML::XS qw(LoadFile);
use Encode qw(decode encode);
use utf8;

# Check if two command line arguments are provided
if (@ARGV != 2) {
    die "Usage: $0 <yaml_directory> <md_directory>\n";
}

my ($yaml_dir, $md_dir) = @ARGV;

# Check if yaml_dir exists
if (!-d $yaml_dir) {
    die "Error: YAML directory '$yaml_dir' does not exist.\n";
}

# Create md_dir if it doesn't exist
if (!-d $md_dir) {
    make_path($md_dir) or die "Error: Cannot create directory '$md_dir': $!\n";
}

# Process all YAML files in the directory
opendir(my $dh, $yaml_dir) or die "Cannot open directory '$yaml_dir': $!\n";
while (my $file = readdir($dh)) {
    next unless $file =~ /\.ya?ml$/i;  # Process only .yml or .yaml files
    
    my $yaml_file = "$yaml_dir/$file";
    my $base_name = basename($file, '.yml', '.yaml');
    my $md_file = "$md_dir/$base_name.md";
    
    print "Converting $yaml_file to $md_file...\n";
    convert_yaml_to_md($yaml_file, $md_file, $base_name);
}
closedir($dh);

print "Conversion completed successfully.\n";

# Function to escape quotes in string for YAML
sub escape_yaml_string {
    my ($str) = @_;
    
    # Escape double quotes with backslash
    $str =~ s/"/\\"/g;
    
    return $str;
}

sub convert_yaml_to_md {
    my ($yaml_file, $md_file, $id) = @_;
    
    # Load YAML file
    my $data;
    eval {
        $data = LoadFile($yaml_file);
    };
    if ($@) {
        warn "Error parsing YAML file '$yaml_file': $@\n";
        return;
    }
    
    # Open markdown file for writing
    open(my $md_fh, '>:encoding(UTF-8)', $md_file) or die "Cannot open file '$md_file' for writing: $!\n";
    
    # Write frontmatter
    print $md_fh "---\n";
    
    # Ensure all required fields exist
    # id field
    my $safe_id = escape_yaml_string($id || "unknown");
    print $md_fh "id: \"$safe_id\"\n";
    
    # name field
    my $name = exists $data->{name} ? $data->{name} : "Unnamed Application";
    my $safe_name = escape_yaml_string($name);
    print $md_fh "name: \"$safe_name\"\n";
    
    # description field
    my $description = exists $data->{description} ? $data->{description} : "No description available";
    my $safe_description = escape_yaml_string($description);
    print $md_fh "description: \"$safe_description\"\n";
    
    # tags field (always include, even if empty)
    print $md_fh "tags:\n";
    my $has_tags = 0;
    
    # Add licenses to tags
    if (exists $data->{licenses} && ref $data->{licenses} eq 'ARRAY' && @{$data->{licenses}} > 0) {
        foreach my $license (@{$data->{licenses}}) {
            my $safe_license = escape_yaml_string($license);
            print $md_fh "  - \"$safe_license\"\n";
            $has_tags = 1;
        }
    }
    
    # Add platforms to tags
    if (exists $data->{platforms} && ref $data->{platforms} eq 'ARRAY' && @{$data->{platforms}} > 0) {
        foreach my $platform (@{$data->{platforms}}) {
            my $safe_platform = escape_yaml_string($platform);
            print $md_fh "  - \"$safe_platform\"\n";
            $has_tags = 1;
        }
    }
    
    # category field (ensure it exists)
    my $category = "Uncategorized";
    if (exists $data->{tags} && ref $data->{tags} eq 'ARRAY' && @{$data->{tags}} > 0) {
        $category = $data->{tags}->[0]; # Use the first tag as category
        $category =~ s/ - .*$//;  # Remove anything after " - " if it exists
    }
    my $safe_category = escape_yaml_string($category);
    print $md_fh "category: \"$safe_category\"\n";
    
    # Add website and GitHub links if they exist
    my $website = exists $data->{website_url} ? $data->{website_url} : "";
    my $github = exists $data->{source_code_url} ? $data->{source_code_url} : "";
    
    my $safe_website = escape_yaml_string($website);
    my $safe_github = escape_yaml_string($github);
    
    print $md_fh "website: \"$safe_website\"\n";
    print $md_fh "github: \"$safe_github\"\n";
    
    # Add placeholder for image (commented out)
    print $md_fh "#image: \"/placeholder.svg?height=300&width=400\"\n";
    
    # End frontmatter
    print $md_fh "---\n\n";
    
    # Add main content - just the name as a header
    # print $md_fh "# $safe_name\n";
    
    close($md_fh);
}